import {
  selectAllManufacturers,
  selectManufacturersLoading,
  selectManufacturersLoaded,
  selectManufacturersError,
  selectSearchTerm,
  selectFilteredManufacturers,
} from './manufacturers.selectors';
import { ManufacturersState } from '../state/manufacturers.state';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

describe('Manufacturers Selectors', () => {
  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'BMW' },
    { Make_ID: 3, Make_Name: 'Toyota' },
  ];

  const mockState: ManufacturersState = {
    ids: [1, 2, 3],
    entities: {
      1: mockManufacturers[0],
      2: mockManufacturers[1],
      3: mockManufacturers[2],
    },
    loading: false,
    loaded: true,
    error: null,
    searchTerm: '',
  };

  describe('selectAllManufacturers', () => {
    it('should return all manufacturers as an array', () => {
      const result = selectAllManufacturers.projector(mockState);
      expect(result).toEqual(mockManufacturers);
    });

    it('should return empty array when no manufacturers', () => {
      const emptyState: ManufacturersState = {
        ...mockState,
        ids: [],
        entities: {},
      };
      const result = selectAllManufacturers.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectManufacturersLoading', () => {
    it('should return loading state', () => {
      const result = selectManufacturersLoading.projector(mockState);
      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const loadingState: ManufacturersState = {
        ...mockState,
        loading: true,
      };
      const result = selectManufacturersLoading.projector(loadingState);
      expect(result).toBe(true);
    });
  });

  describe('selectManufacturersLoaded', () => {
    it('should return loaded state', () => {
      const result = selectManufacturersLoaded.projector(mockState);
      expect(result).toBe(true);
    });

    it('should return false when not loaded', () => {
      const notLoadedState: ManufacturersState = {
        ...mockState,
        loaded: false,
      };
      const result = selectManufacturersLoaded.projector(notLoadedState);
      expect(result).toBe(false);
    });
  });

  describe('selectManufacturersError', () => {
    it('should return null when no error', () => {
      const result = selectManufacturersError.projector(mockState);
      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to load manufacturers';
      const errorState: ManufacturersState = {
        ...mockState,
        error: errorMessage,
      };
      const result = selectManufacturersError.projector(errorState);
      expect(result).toBe(errorMessage);
    });
  });

  describe('selectSearchTerm', () => {
    it('should return empty string by default', () => {
      const result = selectSearchTerm.projector(mockState);
      expect(result).toBe('');
    });

    it('should return current search term', () => {
      const searchTerm = 'tesla';
      const searchState: ManufacturersState = {
        ...mockState,
        searchTerm,
      };
      const result = selectSearchTerm.projector(searchState);
      expect(result).toBe(searchTerm);
    });
  });

  describe('selectFilteredManufacturers', () => {
    it('should return all manufacturers when search term is empty', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, '');
      expect(result).toEqual(mockManufacturers);
    });

    it('should filter manufacturers by name (case insensitive)', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, 'tesla');
      expect(result.length).toBe(1);
      expect(result[0].Make_Name).toBe('Tesla');
    });

    it('should filter manufacturers by name with uppercase search', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, 'TESLA');
      expect(result.length).toBe(1);
      expect(result[0].Make_Name).toBe('Tesla');
    });

    it('should filter manufacturers by partial name match', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, 'to');
      expect(result.length).toBe(1);
      expect(result[0].Make_Name).toBe('Toyota');
    });

    it('should return empty array when no matches', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should handle search term with spaces', () => {
      const result = selectFilteredManufacturers.projector(mockManufacturers, '  tesla  ');
      expect(result.length).toBe(1);
      expect(result[0].Make_Name).toBe('Tesla');
    });
  });
});
