import { brandDetailReducer } from './brand-detail.reducer';
import { BrandDetailActions } from '../actions/brand-detail.actions';
import { BrandDetailState, initialBrandDetailState } from '../state/brand-detail.state';
import { VehicleType } from '../../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';

describe('BrandDetailReducer', () => {
  const mockVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Car' },
    { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
  ];

  const mockVehicleModels: VehicleModel[] = [
    { Model_ID: 1, Model_Name: 'Model S', Make_ID: 1, Make_Name: 'Tesla' },
    { Model_ID: 2, Model_Name: 'Model 3', Make_ID: 1, Make_Name: 'Tesla' },
  ];

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' };
      const result = brandDetailReducer(initialBrandDetailState, action as any);
      expect(result).toBe(initialBrandDetailState);
    });
  });

  describe('loadVehicleTypes action', () => {
    it('should set loading to true without updating make name', () => {
      const makeName = 'Tesla';
      const action = BrandDetailActions.loadVehicleTypes({ makeName });
      const result = brandDetailReducer(initialBrandDetailState, action);

      expect(result.currentMakeName).toBeNull();
      expect(result.vehicleTypesLoading).toBe(true);
      expect(result.vehicleTypesError).toBeNull();
    });

    it('should clear previous error', () => {
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleTypesError: 'Previous error',
      };
      const action = BrandDetailActions.loadVehicleTypes({ makeName: 'BMW' });
      const result = brandDetailReducer(previousState, action);

      expect(result.vehicleTypesError).toBeNull();
    });
  });

  describe('loadVehicleTypesSuccess action', () => {
    it('should store vehicle types, make name, and set loading to false', () => {
      const makeName = 'Tesla';
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleTypesLoading: true,
      };
      const action = BrandDetailActions.loadVehicleTypesSuccess({ makeName, vehicleTypes: mockVehicleTypes });
      const result = brandDetailReducer(previousState, action);

      expect(result.currentMakeName).toBe(makeName);
      expect(result.vehicleTypes).toEqual(mockVehicleTypes);
      expect(result.vehicleTypesLoading).toBe(false);
      expect(result.vehicleTypesError).toBeNull();
    });
  });

  describe('loadVehicleTypesFailure action', () => {
    it('should set error, clear data, and set loading to false', () => {
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleTypes: mockVehicleTypes,
        vehicleTypesLoading: true,
      };
      const errorMessage = 'Failed to load vehicle types';
      const action = BrandDetailActions.loadVehicleTypesFailure({ error: errorMessage });
      const result = brandDetailReducer(previousState, action);

      expect(result.vehicleTypes).toEqual([]);
      expect(result.vehicleTypesLoading).toBe(false);
      expect(result.vehicleTypesError).toBe(errorMessage);
    });
  });

  describe('loadVehicleModels action', () => {
    it('should set loading to true without updating make name', () => {
      const makeName = 'Tesla';
      const action = BrandDetailActions.loadVehicleModels({ makeName });
      const result = brandDetailReducer(initialBrandDetailState, action);

      expect(result.currentMakeName).toBeNull();
      expect(result.vehicleModelsLoading).toBe(true);
      expect(result.vehicleModelsError).toBeNull();
    });

    it('should clear previous error', () => {
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleModelsError: 'Previous error',
      };
      const action = BrandDetailActions.loadVehicleModels({ makeName: 'BMW' });
      const result = brandDetailReducer(previousState, action);

      expect(result.vehicleModelsError).toBeNull();
    });
  });

  describe('loadVehicleModelsSuccess action', () => {
    it('should store vehicle models, make name, and set loading to false', () => {
      const makeName = 'Tesla';
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleModelsLoading: true,
      };
      const action = BrandDetailActions.loadVehicleModelsSuccess({
        makeName,
        vehicleModels: mockVehicleModels,
      });
      const result = brandDetailReducer(previousState, action);

      expect(result.currentMakeName).toBe(makeName);
      expect(result.vehicleModels).toEqual(mockVehicleModels);
      expect(result.vehicleModelsLoading).toBe(false);
      expect(result.vehicleModelsError).toBeNull();
    });
  });

  describe('loadVehicleModelsFailure action', () => {
    it('should set error, clear data, and set loading to false', () => {
      const previousState: BrandDetailState = {
        ...initialBrandDetailState,
        vehicleModels: mockVehicleModels,
        vehicleModelsLoading: true,
      };
      const errorMessage = 'Failed to load vehicle models';
      const action = BrandDetailActions.loadVehicleModelsFailure({ error: errorMessage });
      const result = brandDetailReducer(previousState, action);

      expect(result.vehicleModels).toEqual([]);
      expect(result.vehicleModelsLoading).toBe(false);
      expect(result.vehicleModelsError).toBe(errorMessage);
    });
  });

  describe('clearBrandDetail action', () => {
    it('should reset state to initial state', () => {
      const previousState: BrandDetailState = {
        currentMakeName: 'Tesla',
        vehicleTypes: mockVehicleTypes,
        vehicleModels: mockVehicleModels,
        vehicleTypesLoading: false,
        vehicleModelsLoading: false,
        vehicleTypesError: null,
        vehicleModelsError: null,
      };
      const action = BrandDetailActions.clearBrandDetail();
      const result = brandDetailReducer(previousState, action);

      expect(result).toEqual(initialBrandDetailState);
    });
  });
});
