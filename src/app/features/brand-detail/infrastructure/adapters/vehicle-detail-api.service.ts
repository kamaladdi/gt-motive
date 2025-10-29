import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IBrandDetailRepository } from '../../domain/ports/brand-detail-repository.port';
import { VehicleType } from '../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../domain/models/vehicle-model.model';
import {
  VehicleTypesApiResponse,
  VehicleTypeApiResult,
  VehicleModelsApiResponse,
  VehicleModelApiResult,
} from './models/vehicle-detail-api-response.model';

/** HTTP adapter for brand detail API */
@Injectable({
  providedIn: 'root',
})
export class VehicleDetailApiService implements IBrandDetailRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  getVehicleTypesForMake(makeName: string): Observable<VehicleType[]> {
    const url = `${this.baseUrl}/GetVehicleTypesForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<VehicleTypesApiResponse>(url).pipe(
      map((response) => this.transformVehicleTypesToDomain(response.Results)),
      catchError((error) => this.handleError(error, 'vehicle types'))
    );
  }

  getModelsForMake(makeName: string): Observable<VehicleModel[]> {
    const url = `${this.baseUrl}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<VehicleModelsApiResponse>(url).pipe(
      map((response) => this.transformVehicleModelsToDomain(response.Results)),
      catchError((error) => this.handleError(error, 'vehicle models'))
    );
  }

  private transformVehicleTypesToDomain(apiResults: VehicleTypeApiResult[]): VehicleType[] {
    return apiResults.map((apiType) => ({
      VehicleTypeId: apiType.VehicleTypeId,
      VehicleTypeName: apiType.VehicleTypeName,
    }));
  }

  private transformVehicleModelsToDomain(apiResults: VehicleModelApiResult[]): VehicleModel[] {
    return apiResults.map((apiModel) => ({
      Model_ID: apiModel.Model_ID,
      Model_Name: apiModel.Model_Name,
      Make_ID: apiModel.Make_ID,
      Make_Name: apiModel.Make_Name,
    }));
  }

  private handleError(error: HttpErrorResponse, dataType: string): Observable<never> {
    let errorMessage = `Failed to load ${dataType}`;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }

    console.error(`VehicleDetailApiService Error:`, errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
