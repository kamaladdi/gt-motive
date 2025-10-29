import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BrandDetailActions } from '../actions/brand-detail.actions';
import { VehicleDetailApiService } from '../../adapters/vehicle-detail-api.service';

@Injectable()
export class BrandDetailEffects {
  private readonly actions$ = inject(Actions);
  private readonly vehicleDetailApi = inject(VehicleDetailApiService);

  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandDetailActions.loadVehicleTypes),
      switchMap(({ makeName }) =>
        this.vehicleDetailApi.getVehicleTypesForMake(makeName).pipe(
          map((vehicleTypes) =>
            BrandDetailActions.loadVehicleTypesSuccess({ makeName, vehicleTypes })
          ),
          catchError((error) =>
            of(
              BrandDetailActions.loadVehicleTypesFailure({
                error: error?.message || 'Failed to load vehicle types',
              })
            )
          )
        )
      )
    )
  );

  loadVehicleModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandDetailActions.loadVehicleModels),
      switchMap(({ makeName }) =>
        this.vehicleDetailApi.getModelsForMake(makeName).pipe(
          map((vehicleModels) =>
            BrandDetailActions.loadVehicleModelsSuccess({ makeName, vehicleModels })
          ),
          catchError((error) =>
            of(
              BrandDetailActions.loadVehicleModelsFailure({
                error: error?.message || 'Failed to load vehicle models',
              })
            )
          )
        )
      )
    )
  );
}
