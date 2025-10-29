import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { ManufacturersEffects } from './manufacturers.effects';
import { ManufacturersActions } from '../actions/manufacturers.actions';
import { VehicleApiService } from '../../adapters/vehicle-api.service';
import { selectManufacturersLoaded } from '../selectors/manufacturers.selectors';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

describe('ManufacturersEffects', () => {
  let actions$: Observable<any>;
  let effects: ManufacturersEffects;
  let vehicleApiService: jasmine.SpyObj<VehicleApiService>;
  let store: MockStore;

  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'BMW' },
  ];

  beforeEach(() => {
    const vehicleApiServiceSpy = jasmine.createSpyObj('VehicleApiService', [
      'getAllManufacturers',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ManufacturersEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {},
        }),
        { provide: VehicleApiService, useValue: vehicleApiServiceSpy },
      ],
    });

    effects = TestBed.inject(ManufacturersEffects);
    vehicleApiService = TestBed.inject(VehicleApiService) as jasmine.SpyObj<VehicleApiService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadManufacturers$', () => {
    it('should return loadSuccess action with manufacturers when not loaded', (done) => {
      // Setup: manufacturers not loaded
      store.overrideSelector(selectManufacturersLoaded, false);
      store.refreshState();

      vehicleApiService.getAllManufacturers.and.returnValue(of(mockManufacturers));
      actions$ = of(ManufacturersActions.load());

      effects.loadManufacturers$.subscribe((action) => {
        expect(action).toEqual(ManufacturersActions.loadSuccess({ manufacturers: mockManufacturers }));
        expect(vehicleApiService.getAllManufacturers).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should not call API when manufacturers already loaded', (done) => {
      // Setup: manufacturers already loaded
      store.overrideSelector(selectManufacturersLoaded, true);
      store.refreshState();

      actions$ = of(ManufacturersActions.load());

      // Create a promise to track if effect completes without emitting
      const subscription = effects.loadManufacturers$.subscribe(
        () => {
          fail('Effect should not emit when data is already loaded');
        },
        (error) => {
          fail(`Effect should not error: ${error}`);
        }
      );

      // Wait a bit to ensure no emission
      setTimeout(() => {
        expect(vehicleApiService.getAllManufacturers).not.toHaveBeenCalled();
        subscription.unsubscribe();
        done();
      }, 100);
    });

    it('should return loadFailure action on API error', (done) => {
      store.overrideSelector(selectManufacturersLoaded, false);
      store.refreshState();

      const errorMessage = 'Network error';
      const error = new Error(errorMessage);
      vehicleApiService.getAllManufacturers.and.returnValue(throwError(() => error));
      actions$ = of(ManufacturersActions.load());

      effects.loadManufacturers$.subscribe((action) => {
        expect(action).toEqual(ManufacturersActions.loadFailure({ error: errorMessage }));
        done();
      });
    });

    it('should return loadFailure with default message when error has no message', (done) => {
      store.overrideSelector(selectManufacturersLoaded, false);
      store.refreshState();

      vehicleApiService.getAllManufacturers.and.returnValue(throwError(() => ({})));
      actions$ = of(ManufacturersActions.load());

      effects.loadManufacturers$.subscribe((action) => {
        expect(action).toEqual(
          ManufacturersActions.loadFailure({ error: 'Failed to load manufacturers' })
        );
        done();
      });
    });
  });
});
