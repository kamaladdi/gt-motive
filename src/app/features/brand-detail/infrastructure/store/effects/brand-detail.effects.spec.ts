import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { BrandDetailEffects } from './brand-detail.effects';
import { BrandDetailActions } from '../actions/brand-detail.actions';
import { VehicleDetailApiService } from '../../adapters/vehicle-detail-api.service';
import { VehicleType } from '../../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';

describe('BrandDetailEffects', () => {
  let actions$: Observable<any>;
  let effects: BrandDetailEffects;
  let vehicleDetailApiService: jasmine.SpyObj<VehicleDetailApiService>;

  const mockVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Car' },
    { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
  ];

  const mockVehicleModels: VehicleModel[] = [
    { Model_ID: 1, Model_Name: 'Model S', Make_ID: 1, Make_Name: 'Tesla' },
    { Model_ID: 2, Model_Name: 'Model 3', Make_ID: 1, Make_Name: 'Tesla' },
  ];

  beforeEach(() => {
    const vehicleDetailApiServiceSpy = jasmine.createSpyObj('VehicleDetailApiService', [
      'getVehicleTypesForMake',
      'getModelsForMake',
    ]);

    TestBed.configureTestingModule({
      providers: [
        BrandDetailEffects,
        provideMockActions(() => actions$),
        { provide: VehicleDetailApiService, useValue: vehicleDetailApiServiceSpy },
      ],
    });

    effects = TestBed.inject(BrandDetailEffects);
    vehicleDetailApiService = TestBed.inject(
      VehicleDetailApiService
    ) as jasmine.SpyObj<VehicleDetailApiService>;
  });

  describe('loadVehicleTypes$', () => {
    it('should return loadVehicleTypesSuccess on successful API call', (done) => {
      vehicleDetailApiService.getVehicleTypesForMake.and.returnValue(of(mockVehicleTypes));
      actions$ = of(BrandDetailActions.loadVehicleTypes({ makeName: 'Tesla' }));

      effects.loadVehicleTypes$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleTypesSuccess({ makeName: 'Tesla', vehicleTypes: mockVehicleTypes })
        );
        expect(vehicleDetailApiService.getVehicleTypesForMake).toHaveBeenCalledWith('Tesla');
        done();
      });
    });

    it('should return loadVehicleTypesFailure on API error', (done) => {
      const errorMessage = 'Network error';
      const error = new Error(errorMessage);
      vehicleDetailApiService.getVehicleTypesForMake.and.returnValue(throwError(() => error));
      actions$ = of(BrandDetailActions.loadVehicleTypes({ makeName: 'Tesla' }));

      effects.loadVehicleTypes$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleTypesFailure({ error: errorMessage })
        );
        done();
      });
    });

    it('should return default error message when error has no message', (done) => {
      vehicleDetailApiService.getVehicleTypesForMake.and.returnValue(throwError(() => ({})));
      actions$ = of(BrandDetailActions.loadVehicleTypes({ makeName: 'Tesla' }));

      effects.loadVehicleTypes$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleTypesFailure({ error: 'Failed to load vehicle types' })
        );
        done();
      });
    });
  });

  describe('loadVehicleModels$', () => {
    it('should return loadVehicleModelsSuccess on successful API call', (done) => {
      vehicleDetailApiService.getModelsForMake.and.returnValue(of(mockVehicleModels));
      actions$ = of(BrandDetailActions.loadVehicleModels({ makeName: 'Tesla' }));

      effects.loadVehicleModels$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleModelsSuccess({ makeName: 'Tesla', vehicleModels: mockVehicleModels })
        );
        expect(vehicleDetailApiService.getModelsForMake).toHaveBeenCalledWith('Tesla');
        done();
      });
    });

    it('should return loadVehicleModelsFailure on API error', (done) => {
      const errorMessage = 'Network error';
      const error = new Error(errorMessage);
      vehicleDetailApiService.getModelsForMake.and.returnValue(throwError(() => error));
      actions$ = of(BrandDetailActions.loadVehicleModels({ makeName: 'Tesla' }));

      effects.loadVehicleModels$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleModelsFailure({ error: errorMessage })
        );
        done();
      });
    });

    it('should return default error message when error has no message', (done) => {
      vehicleDetailApiService.getModelsForMake.and.returnValue(throwError(() => ({})));
      actions$ = of(BrandDetailActions.loadVehicleModels({ makeName: 'Tesla' }));

      effects.loadVehicleModels$.subscribe((action) => {
        expect(action).toEqual(
          BrandDetailActions.loadVehicleModelsFailure({ error: 'Failed to load vehicle models' })
        );
        done();
      });
    });
  });
});
