import { manufacturersReducer } from './manufacturers.reducer';
import { ManufacturersActions } from '../actions/manufacturers.actions';
import { initialManufacturersState, ManufacturersState } from '../state/manufacturers.state';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

describe('ManufacturersReducer', () => {
  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'BMW' },
  ];

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' };
      const result = manufacturersReducer(initialManufacturersState, action as any);
      expect(result).toBe(initialManufacturersState);
    });
  });

  describe('load action', () => {
    it('should set loading to true and clear error when not loaded', () => {
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        loaded: false,
        error: 'Previous error',
      };
      const action = ManufacturersActions.load();
      const result = manufacturersReducer(previousState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should keep loading false when already loaded', () => {
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        loaded: true,
        loading: false,
      };
      const action = ManufacturersActions.load();
      const result = manufacturersReducer(previousState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSuccess action', () => {
    it('should store manufacturers and set loading to false', () => {
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        loading: true,
      };
      const action = ManufacturersActions.loadSuccess({ manufacturers: mockManufacturers });
      const result = manufacturersReducer(previousState, action);

      expect(result.loading).toBe(false);
      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(2);
      expect(result.entities[1]).toEqual(mockManufacturers[0]);
      expect(result.entities[2]).toEqual(mockManufacturers[1]);
    });

    it('should replace existing manufacturers', () => {
      const existingManufacturers: Manufacturer[] = [
        { Make_ID: 3, Make_Name: 'Toyota' },
      ];
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        ids: [3],
        entities: { 3: existingManufacturers[0] },
        loading: true,
      };
      const action = ManufacturersActions.loadSuccess({ manufacturers: mockManufacturers });
      const result = manufacturersReducer(previousState, action);

      expect(result.ids.length).toBe(2);
      expect(result.entities[3]).toBeUndefined();
      expect(result.entities[1]).toEqual(mockManufacturers[0]);
    });
  });

  describe('loadFailure action', () => {
    it('should set error and loading to false', () => {
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        loading: true,
      };
      const errorMessage = 'Failed to load manufacturers';
      const action = ManufacturersActions.loadFailure({ error: errorMessage });
      const result = manufacturersReducer(previousState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });

  describe('filter action', () => {
    it('should update search term', () => {
      const searchTerm = 'tesla';
      const action = ManufacturersActions.filter({ searchTerm });
      const result = manufacturersReducer(initialManufacturersState, action);

      expect(result.searchTerm).toBe(searchTerm);
    });

    it('should update search term when already set', () => {
      const previousState: ManufacturersState = {
        ...initialManufacturersState,
        searchTerm: 'old term',
      };
      const newSearchTerm = 'new term';
      const action = ManufacturersActions.filter({ searchTerm: newSearchTerm });
      const result = manufacturersReducer(previousState, action);

      expect(result.searchTerm).toBe(newSearchTerm);
    });
  });
});
