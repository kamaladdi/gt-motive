import {
  selectCurrentMakeName,
  selectVehicleTypes,
  selectVehicleTypesLoading,
  selectVehicleTypesError,
  selectVehicleModels,
  selectVehicleModelsLoading,
  selectVehicleModelsError,
  selectVehicleTypesCount,
  selectVehicleModelsCount,
  selectIsLoading,
  selectError,
} from './brand-detail.selectors';
import { BrandDetailState } from '../state/brand-detail.state';
import { VehicleType } from '../../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';

describe('BrandDetail Selectors', () => {
  const mockVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Car' },
    { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
  ];

  const mockVehicleModels: VehicleModel[] = [
    { Model_ID: 1, Model_Name: 'Model S', Make_ID: 1, Make_Name: 'Tesla' },
    { Model_ID: 2, Model_Name: 'Model 3', Make_ID: 1, Make_Name: 'Tesla' },
  ];

  const mockState: BrandDetailState = {
    currentMakeName: 'Tesla',
    vehicleTypes: mockVehicleTypes,
    vehicleModels: mockVehicleModels,
    vehicleTypesLoading: false,
    vehicleModelsLoading: false,
    vehicleTypesError: null,
    vehicleModelsError: null,
  };

  describe('selectCurrentMakeName', () => {
    it('should return the current make name', () => {
      const result = selectCurrentMakeName.projector(mockState);
      expect(result).toBe('Tesla');
    });

    it('should return null when no make name set', () => {
      const emptyState: BrandDetailState = {
        ...mockState,
        currentMakeName: null,
      };
      const result = selectCurrentMakeName.projector(emptyState);
      expect(result).toBeNull();
    });
  });

  describe('selectVehicleTypes', () => {
    it('should return vehicle types array', () => {
      const result = selectVehicleTypes.projector(mockState);
      expect(result).toEqual(mockVehicleTypes);
    });

    it('should return empty array when no vehicle types', () => {
      const emptyState: BrandDetailState = {
        ...mockState,
        vehicleTypes: [],
      };
      const result = selectVehicleTypes.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectVehicleTypesLoading', () => {
    it('should return false when not loading', () => {
      const result = selectVehicleTypesLoading.projector(mockState);
      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const loadingState: BrandDetailState = {
        ...mockState,
        vehicleTypesLoading: true,
      };
      const result = selectVehicleTypesLoading.projector(loadingState);
      expect(result).toBe(true);
    });
  });

  describe('selectVehicleTypesError', () => {
    it('should return null when no error', () => {
      const result = selectVehicleTypesError.projector(mockState);
      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to load vehicle types';
      const errorState: BrandDetailState = {
        ...mockState,
        vehicleTypesError: errorMessage,
      };
      const result = selectVehicleTypesError.projector(errorState);
      expect(result).toBe(errorMessage);
    });
  });

  describe('selectVehicleModels', () => {
    it('should return vehicle models array', () => {
      const result = selectVehicleModels.projector(mockState);
      expect(result).toEqual(mockVehicleModels);
    });

    it('should return empty array when no vehicle models', () => {
      const emptyState: BrandDetailState = {
        ...mockState,
        vehicleModels: [],
      };
      const result = selectVehicleModels.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectVehicleModelsLoading', () => {
    it('should return false when not loading', () => {
      const result = selectVehicleModelsLoading.projector(mockState);
      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const loadingState: BrandDetailState = {
        ...mockState,
        vehicleModelsLoading: true,
      };
      const result = selectVehicleModelsLoading.projector(loadingState);
      expect(result).toBe(true);
    });
  });

  describe('selectVehicleModelsError', () => {
    it('should return null when no error', () => {
      const result = selectVehicleModelsError.projector(mockState);
      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to load vehicle models';
      const errorState: BrandDetailState = {
        ...mockState,
        vehicleModelsError: errorMessage,
      };
      const result = selectVehicleModelsError.projector(errorState);
      expect(result).toBe(errorMessage);
    });
  });

  describe('selectVehicleTypesCount', () => {
    it('should return the count of vehicle types', () => {
      const result = selectVehicleTypesCount.projector(mockVehicleTypes);
      expect(result).toBe(2);
    });

    it('should return 0 when no vehicle types', () => {
      const result = selectVehicleTypesCount.projector([]);
      expect(result).toBe(0);
    });
  });

  describe('selectVehicleModelsCount', () => {
    it('should return the count of vehicle models', () => {
      const result = selectVehicleModelsCount.projector(mockVehicleModels);
      expect(result).toBe(2);
    });

    it('should return 0 when no vehicle models', () => {
      const result = selectVehicleModelsCount.projector([]);
      expect(result).toBe(0);
    });
  });

  describe('selectIsLoading', () => {
    it('should return false when neither is loading', () => {
      const result = selectIsLoading.projector(false, false);
      expect(result).toBe(false);
    });

    it('should return true when vehicle types are loading', () => {
      const result = selectIsLoading.projector(true, false);
      expect(result).toBe(true);
    });

    it('should return true when vehicle models are loading', () => {
      const result = selectIsLoading.projector(false, true);
      expect(result).toBe(true);
    });

    it('should return true when both are loading', () => {
      const result = selectIsLoading.projector(true, true);
      expect(result).toBe(true);
    });
  });

  describe('selectError', () => {
    it('should return null when no errors', () => {
      const result = selectError.projector(null, null);
      expect(result).toBeNull();
    });

    it('should return vehicle types error when present', () => {
      const typesError = 'Types error';
      const result = selectError.projector(typesError, null);
      expect(result).toBe(typesError);
    });

    it('should return vehicle models error when present', () => {
      const modelsError = 'Models error';
      const result = selectError.projector(null, modelsError);
      expect(result).toBe(modelsError);
    });

    it('should return first error when both are present', () => {
      const typesError = 'Types error';
      const modelsError = 'Models error';
      const result = selectError.projector(typesError, modelsError);
      expect(result).toBe(typesError);
    });
  });
});
