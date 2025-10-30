import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoadManufacturersUseCase } from './load-manufacturers.use-case';
import { ManufacturersActions } from '../../infrastructure/store';
import {
  selectAllManufacturers,
  selectManufacturersLoading,
  selectManufacturersError,
  selectManufacturersLoaded,
} from '../../infrastructure/store';
import { Manufacturer } from '../../domain/models/manufacturer.model';

describe('LoadManufacturersUseCase', () => {
  let useCase: LoadManufacturersUseCase;
  let store: MockStore;

  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'BMW' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        LoadManufacturersUseCase,
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    useCase = TestBed.inject(LoadManufacturersUseCase);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('execute', () => {
    it('should dispatch load action', () => {
      useCase.execute();
      expect(store.dispatch).toHaveBeenCalledWith(ManufacturersActions.load());
    });
  });

  describe('getManufacturers', () => {
    it('should return manufacturers from store', (done) => {
      store.overrideSelector(selectAllManufacturers, mockManufacturers);
      store.refreshState();

      useCase.getManufacturers().subscribe((manufacturers) => {
        expect(manufacturers).toEqual(mockManufacturers);
        done();
      });
    });
  });

  describe('getLoadingState', () => {
    it('should return loading state from store', (done) => {
      store.overrideSelector(selectManufacturersLoading, true);
      store.refreshState();

      useCase.getLoadingState().subscribe((loading) => {
        expect(loading).toBe(true);
        done();
      });
    });
  });

  describe('getErrorState', () => {
    it('should return error state from store', (done) => {
      const errorMessage = 'Failed to load manufacturers';
      store.overrideSelector(selectManufacturersError, errorMessage);
      store.refreshState();

      useCase.getErrorState().subscribe((error) => {
        expect(error).toBe(errorMessage);
        done();
      });
    });
  });

  describe('isLoaded', () => {
    it('should return loaded state from store', (done) => {
      store.overrideSelector(selectManufacturersLoaded, true);
      store.refreshState();

      useCase.isLoaded().subscribe((loaded) => {
        expect(loaded).toBe(true);
        done();
      });
    });
  });
});
