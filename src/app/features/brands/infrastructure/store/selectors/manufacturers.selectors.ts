import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManufacturersState, manufacturersAdapter } from '../state/manufacturers.state';

export const selectManufacturersState =
  createFeatureSelector<ManufacturersState>('manufacturers');

const { selectAll, selectEntities, selectIds, selectTotal } =
  manufacturersAdapter.getSelectors();

export const selectAllManufacturers = createSelector(selectManufacturersState, selectAll);

export const selectManufacturerEntities = createSelector(selectManufacturersState, selectEntities);

export const selectManufacturerIds = createSelector(selectManufacturersState, selectIds);

export const selectManufacturersTotal = createSelector(selectManufacturersState, selectTotal);

export const selectManufacturersLoading = createSelector(
  selectManufacturersState,
  (state) => state.loading
);

export const selectManufacturersLoaded = createSelector(
  selectManufacturersState,
  (state) => state.loaded
);

export const selectManufacturersError = createSelector(
  selectManufacturersState,
  (state) => state.error
);

export const selectSearchTerm = createSelector(
  selectManufacturersState,
  (state) => state.searchTerm
);

export const selectFilteredManufacturers = createSelector(
  selectAllManufacturers,
  selectSearchTerm,
  (manufacturers, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return manufacturers;
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    return manufacturers.filter((manufacturer) => {
      return manufacturer.Make_Name.toLowerCase().includes(lowerSearchTerm);
    });
  }
);