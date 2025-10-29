import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VehicleType } from '../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../domain/models/vehicle-model.model';
import { BrandDetailActions } from '../../infrastructure/store';
import {
  selectVehicleTypes,
  selectVehicleModels,
  selectVehicleTypesLoading,
  selectVehicleModelsLoading,
  selectVehicleTypesError,
  selectVehicleModelsError,
  selectCurrentMakeName,
} from '../../infrastructure/store';

/** Loads vehicle types and models for a manufacturer with caching */
@Injectable({
  providedIn: 'root',
})
export class LoadBrandDetailsUseCase {
  private readonly store = inject(Store);

  // Only loads if switching to a different manufacturer
  execute(makeName: string): void {
    let currentMake: string | null = null;
    this.store.select(selectCurrentMakeName).subscribe(make => {
      currentMake = make;
    }).unsubscribe();

    if (currentMake !== makeName) {
      this.store.dispatch(BrandDetailActions.loadVehicleTypes({ makeName }));
      this.store.dispatch(BrandDetailActions.loadVehicleModels({ makeName }));
    }
  }

  getVehicleTypes(): Observable<VehicleType[]> {
    return this.store.select(selectVehicleTypes);
  }

  getVehicleModels(): Observable<VehicleModel[]> {
    return this.store.select(selectVehicleModels);
  }

  getVehicleTypesLoadingState(): Observable<boolean> {
    return this.store.select(selectVehicleTypesLoading);
  }

  getVehicleModelsLoadingState(): Observable<boolean> {
    return this.store.select(selectVehicleModelsLoading);
  }

  getVehicleTypesErrorState(): Observable<string | null> {
    return this.store.select(selectVehicleTypesError);
  }

  getVehicleModelsErrorState(): Observable<string | null> {
    return this.store.select(selectVehicleModelsError);
  }
}
