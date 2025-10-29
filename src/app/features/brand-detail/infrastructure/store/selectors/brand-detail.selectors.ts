import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandDetailState } from '../state/brand-detail.state';

export const selectBrandDetailState = createFeatureSelector<BrandDetailState>('brandDetail');

export const selectCurrentMakeName = createSelector(
  selectBrandDetailState,
  (state: BrandDetailState) => state.currentMakeName
);

export const selectVehicleTypes = createSelector(
  selectBrandDetailState,
  (state: BrandDetailState) => state.vehicleTypes
);

export const selectVehicleTypesLoading = createSelector(
  selectBrandDetailState,
  (state) => state.vehicleTypesLoading
);

export const selectVehicleTypesError = createSelector(
  selectBrandDetailState,
  (state) => state.vehicleTypesError
);

export const selectVehicleModels = createSelector(
  selectBrandDetailState,
  (state) => state.vehicleModels
);

export const selectVehicleModelsLoading = createSelector(
  selectBrandDetailState,
  (state) => state.vehicleModelsLoading
);

export const selectVehicleModelsError = createSelector(
  selectBrandDetailState,
  (state) => state.vehicleModelsError
);

export const selectVehicleTypesCount = createSelector(
  selectVehicleTypes,
  (types) => types.length
);

export const selectVehicleModelsCount = createSelector(
  selectVehicleModels,
  (models) => models.length
);

export const selectIsLoading = createSelector(
  selectVehicleTypesLoading,
  selectVehicleModelsLoading,
  (typesLoading, modelsLoading) => typesLoading || modelsLoading
);

export const selectError = createSelector(
  selectVehicleTypesError,
  selectVehicleModelsError,
  (typesError, modelsError) => typesError || modelsError
);
