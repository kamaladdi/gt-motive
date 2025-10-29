import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Manufacturer } from '../../domain/models/manufacturer.model';
import { ManufacturersActions } from '../../infrastructure/store/actions/manufacturers.actions';
import {
  selectAllManufacturers,
  selectManufacturersLoading,
  selectManufacturersError,
  selectManufacturersLoaded,
} from '../../infrastructure/store/selectors/manufacturers.selectors';

/** Loads manufacturers from store with caching */
@Injectable({
  providedIn: 'root',
})
export class LoadManufacturersUseCase {
  private readonly store = inject(Store);

  execute(): void {
    this.store.dispatch(ManufacturersActions.load());
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.store.select(selectAllManufacturers);
  }

  getLoadingState(): Observable<boolean> {
    return this.store.select(selectManufacturersLoading);
  }

  getErrorState(): Observable<string | null> {
    return this.store.select(selectManufacturersError);
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(selectManufacturersLoaded);
  }
}
