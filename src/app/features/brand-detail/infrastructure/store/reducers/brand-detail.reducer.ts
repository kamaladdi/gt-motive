import { createReducer, on } from '@ngrx/store';
import { BrandDetailActions } from '../actions/brand-detail.actions';
import { BrandDetailState, initialBrandDetailState } from '../state/brand-detail.state';

export const brandDetailReducer = createReducer(
  initialBrandDetailState,

  on(
    BrandDetailActions.loadVehicleTypes,
    (state): BrandDetailState => ({
      ...state,
      vehicleTypesLoading: true,
      vehicleTypesError: null,
    })
  ),

  on(
    BrandDetailActions.loadVehicleTypesSuccess,
    (state, { makeName, vehicleTypes }): BrandDetailState => ({
      ...state,
      currentMakeName: makeName,
      vehicleTypes,
      vehicleTypesLoading: false,
      vehicleTypesError: null,
    })
  ),

  on(
    BrandDetailActions.loadVehicleTypesFailure,
    (state, { error }): BrandDetailState => ({
      ...state,
      vehicleTypes: [],
      vehicleTypesLoading: false,
      vehicleTypesError: error,
    })
  ),

  on(
    BrandDetailActions.loadVehicleModels,
    (state): BrandDetailState => ({
      ...state,
      vehicleModelsLoading: true,
      vehicleModelsError: null,
    })
  ),

  on(
    BrandDetailActions.loadVehicleModelsSuccess,
    (state, { makeName, vehicleModels }): BrandDetailState => ({
      ...state,
      currentMakeName: makeName,
      vehicleModels,
      vehicleModelsLoading: false,
      vehicleModelsError: null,
    })
  ),

  on(
    BrandDetailActions.loadVehicleModelsFailure,
    (state, { error }): BrandDetailState => ({
      ...state,
      vehicleModels: [],
      vehicleModelsLoading: false,
      vehicleModelsError: error,
    })
  ),

  on(BrandDetailActions.clearBrandDetail, (): BrandDetailState => initialBrandDetailState)
);
