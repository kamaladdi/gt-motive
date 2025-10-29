import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Manufacturer } from '../../domain/models/manufacturer.model';
import { ManufacturerRepository } from '../../domain/ports/manufacturer-repository.port';
import {
  VehicleApiResponse,
  VehicleApiMake,
} from './models/vehicle-api-response.model';

/** HTTP adapter for NHTSA VPIC API */
@Injectable({
  providedIn: 'root',
})
export class VehicleApiService implements ManufacturerRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  getAllManufacturers(): Observable<Manufacturer[]> {
    const url = `${this.baseUrl}/getallmakes?format=json`;
    return this.http.get<VehicleApiResponse>(url).pipe(
      map((response) => this.transformToDomain(response.Results))
    );
  }

  private transformToDomain(apiMakes: VehicleApiMake[]): Manufacturer[] {
    return apiMakes.map((apiMake) => ({
      Make_ID: apiMake.Make_ID,
      Make_Name: apiMake.Make_Name,
    }));
  }
}