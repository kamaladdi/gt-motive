import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

export interface ManufacturersState extends EntityState<Manufacturer> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  searchTerm: string;
}

export const manufacturersAdapter: EntityAdapter<Manufacturer> = createEntityAdapter<Manufacturer>({
  selectId: (manufacturer) => manufacturer.Make_ID,
  sortComparer: (a, b) => a.Make_Name.localeCompare(b.Make_Name),
});

export const initialManufacturersState: ManufacturersState = manufacturersAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  searchTerm: '',
});