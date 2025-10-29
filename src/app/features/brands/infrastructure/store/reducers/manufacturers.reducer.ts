import { createReducer, on } from '@ngrx/store';
import { ManufacturersActions } from '../actions/manufacturers.actions';
import {
  initialManufacturersState,
  manufacturersAdapter,
  ManufacturersState,
} from '../state/manufacturers.state';

export const manufacturersReducer = createReducer(
  initialManufacturersState,

  on(ManufacturersActions.load, (state): ManufacturersState => ({
    ...state,
    loading: state.loaded ? false : true,
    error: null,
  })),

  on(
    ManufacturersActions.loadSuccess,
    (state, { manufacturers }): ManufacturersState =>
      manufacturersAdapter.setAll(manufacturers, {
        ...state,
        loading: false,
        loaded: true,
        error: null,
      })
  ),

  on(ManufacturersActions.loadFailure, (state, { error }): ManufacturersState => ({
    ...state,
    loading: false,
    error,
  })),

  on(ManufacturersActions.filter, (state, { searchTerm }): ManufacturersState => ({
    ...state,
    searchTerm,
  }))
);