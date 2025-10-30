import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoadBrandDetailsUseCase } from './load-brand-details.use-case';
import { BrandDetailActions } from '../../infrastructure/store';
import {
  selectVehicleTypes,
  selectVehicleModels,
  selectVehicleTypesLoading,
  selectVehicleModelsLoading,
  selectVehicleTypesError,
  selectVehicleModelsError,
  selectCurrentMakeName,
} from '../../infrastructure/store';
import { VehicleType } from '../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../domain/models/vehicle-model.model';

describe('LoadBrandDetailsUseCase', () => {
  let useCase: LoadBrandDetailsUseCase;
  let store: MockStore;

  const mockVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Car' },
    { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
  ];

  const mockVehicleModels: VehicleModel[] = [
    { Model_ID: 1, Model_Name: 'Model S', Make_ID: 1, Make_Name: 'Tesla' },
    { Model_ID: 2, Model_Name: 'Model 3', Make_ID: 1, Make_Name: 'Tesla' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        LoadBrandDetailsUseCase,
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    useCase = TestBed.inject(LoadBrandDetailsUseCase);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('execute', () => {
    it('should dispatch load actions when make name is different', () => {
      store.overrideSelector(selectCurrentMakeName, null);
      store.refreshState();

      const makeName = 'Tesla';
      useCase.execute(makeName);

      expect(store.dispatch).toHaveBeenCalledWith(
        BrandDetailActions.loadVehicleTypes({ makeName })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        BrandDetailActions.loadVehicleModels({ makeName })
      );
    });

    it('should dispatch load actions when switching manufacturers', () => {
      store.overrideSelector(selectCurrentMakeName, 'BMW');
      store.refreshState();

      const makeName = 'Tesla';
      useCase.execute(makeName);

      expect(store.dispatch).toHaveBeenCalledWith(
        BrandDetailActions.loadVehicleTypes({ makeName })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        BrandDetailActions.loadVehicleModels({ makeName })
      );
    });

    it('should not dispatch actions when make name is the same', () => {
      const makeName = 'Tesla';
      store.overrideSelector(selectCurrentMakeName, makeName);
      store.refreshState();

      useCase.execute(makeName);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('getVehicleTypes', () => {
    it('should return vehicle types from store', (done) => {
      store.overrideSelector(selectVehicleTypes, mockVehicleTypes);
      store.refreshState();

      useCase.getVehicleTypes().subscribe((types) => {
        expect(types).toEqual(mockVehicleTypes);
        done();
      });
    });
  });

  describe('getVehicleModels', () => {
    it('should return vehicle models from store', (done) => {
      store.overrideSelector(selectVehicleModels, mockVehicleModels);
      store.refreshState();

      useCase.getVehicleModels().subscribe((models) => {
        expect(models).toEqual(mockVehicleModels);
        done();
      });
    });
  });

  describe('getVehicleTypesLoadingState', () => {
    it('should return vehicle types loading state', (done) => {
      store.overrideSelector(selectVehicleTypesLoading, true);
      store.refreshState();

      useCase.getVehicleTypesLoadingState().subscribe((loading) => {
        expect(loading).toBe(true);
        done();
      });
    });
  });

  describe('getVehicleModelsLoadingState', () => {
    it('should return vehicle models loading state', (done) => {
      store.overrideSelector(selectVehicleModelsLoading, true);
      store.refreshState();

      useCase.getVehicleModelsLoadingState().subscribe((loading) => {
        expect(loading).toBe(true);
        done();
      });
    });
  });

  describe('getVehicleTypesErrorState', () => {
    it('should return vehicle types error state', (done) => {
      const errorMessage = 'Failed to load vehicle types';
      store.overrideSelector(selectVehicleTypesError, errorMessage);
      store.refreshState();

      useCase.getVehicleTypesErrorState().subscribe((error) => {
        expect(error).toBe(errorMessage);
        done();
      });
    });
  });

  describe('getVehicleModelsErrorState', () => {
    it('should return vehicle models error state', (done) => {
      const errorMessage = 'Failed to load vehicle models';
      store.overrideSelector(selectVehicleModelsError, errorMessage);
      store.refreshState();

      useCase.getVehicleModelsErrorState().subscribe((error) => {
        expect(error).toBe(errorMessage);
        done();
      });
    });
  });
});
