import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchManufacturersUseCase } from './search-manufacturers.use-case';
import { ManufacturersActions } from '../../infrastructure/store/actions/manufacturers.actions';
import { selectFilteredManufacturers } from '../../infrastructure/store/selectors/manufacturers.selectors';
import { Manufacturer } from '../../domain/models/manufacturer.model';

describe('SearchManufacturersUseCase', () => {
  let useCase: SearchManufacturersUseCase;
  let store: MockStore;

  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'Toyota' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchManufacturersUseCase,
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    useCase = TestBed.inject(SearchManufacturersUseCase);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('execute', () => {
    it('should dispatch filter action with search term', () => {
      const searchTerm = 'tesla';
      useCase.execute(searchTerm);
      expect(store.dispatch).toHaveBeenCalledWith(
        ManufacturersActions.filter({ searchTerm })
      );
    });

    it('should dispatch filter action with empty search term', () => {
      const searchTerm = '';
      useCase.execute(searchTerm);
      expect(store.dispatch).toHaveBeenCalledWith(
        ManufacturersActions.filter({ searchTerm })
      );
    });
  });

  describe('getFilteredManufacturers', () => {
    it('should return filtered manufacturers from store', (done) => {
      const filteredManufacturers = [mockManufacturers[0]];
      store.overrideSelector(selectFilteredManufacturers, filteredManufacturers);
      store.refreshState();

      useCase.getFilteredManufacturers().subscribe((manufacturers) => {
        expect(manufacturers).toEqual(filteredManufacturers);
        done();
      });
    });

    it('should return empty array when no manufacturers match', (done) => {
      store.overrideSelector(selectFilteredManufacturers, []);
      store.refreshState();

      useCase.getFilteredManufacturers().subscribe((manufacturers) => {
        expect(manufacturers).toEqual([]);
        done();
      });
    });
  });
});
