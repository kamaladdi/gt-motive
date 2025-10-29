import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Manufacturer } from '../../domain/models/manufacturer.model';
import { ManufacturersActions } from '../../infrastructure/store/actions/manufacturers.actions';
import { selectFilteredManufacturers, selectSearchTerm } from '../../infrastructure/store/selectors/manufacturers.selectors';

/** Filters manufacturers by search term */
@Injectable({
  providedIn: 'root',
})
export class SearchManufacturersUseCase {
  private readonly store = inject(Store);

  execute(searchTerm: string): void {
    this.store.dispatch(ManufacturersActions.filter({ searchTerm }));
  }

  getFilteredManufacturers(): Observable<Manufacturer[]> {
    return this.store.select(selectFilteredManufacturers);
  }

  getSearchTerm(): Observable<string> {
    return this.store.select(selectSearchTerm);
  }
}
