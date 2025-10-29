import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { ManufacturersActions } from '../actions/manufacturers.actions';
import { VehicleApiService } from '../../adapters/vehicle-api.service';
import { selectManufacturersLoaded } from '../selectors/manufacturers.selectors';

@Injectable()
export class ManufacturersEffects {
  private readonly actions$ = inject(Actions);
  private readonly vehicleApi = inject(VehicleApiService);
  private readonly store = inject(Store);

  loadManufacturers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.load),
      withLatestFrom(this.store.select(selectManufacturersLoaded)),
      filter(([, loaded]) => !loaded),
      switchMap(() =>
        this.vehicleApi.getAllManufacturers().pipe(
          map((manufacturers) =>
            ManufacturersActions.loadSuccess({ manufacturers })
          ),
          catchError((error) =>
            of(
              ManufacturersActions.loadFailure({
                error: error?.message || 'Failed to load manufacturers',
              })
            )
          )
        )
      )
    )
  );
}