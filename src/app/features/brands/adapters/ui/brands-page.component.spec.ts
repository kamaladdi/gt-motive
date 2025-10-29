import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { BrandsPageComponent } from './brands-page.component';
import { LoadManufacturersUseCase } from '../../application/use-cases/load-manufacturers.use-case';
import { SearchManufacturersUseCase } from '../../application/use-cases/search-manufacturers.use-case';
import { Manufacturer } from '../../domain/models/manufacturer.model';

describe('BrandsPageComponent', () => {
  let component: BrandsPageComponent;
  let fixture: ComponentFixture<BrandsPageComponent>;
  let loadManufacturersUseCase: jasmine.SpyObj<LoadManufacturersUseCase>;
  let searchManufacturersUseCase: jasmine.SpyObj<SearchManufacturersUseCase>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockManufacturers: Manufacturer[] = [
    { Make_ID: 1, Make_Name: 'Tesla' },
    { Make_ID: 2, Make_Name: 'BMW' },
  ];

  beforeEach(async () => {
    const loadManufacturersUseCaseSpy = jasmine.createSpyObj('LoadManufacturersUseCase', [
      'execute',
      'getManufacturers',
      'getLoadingState',
      'getErrorState',
    ]);
    const searchManufacturersUseCaseSpy = jasmine.createSpyObj('SearchManufacturersUseCase', [
      'execute',
      'getFilteredManufacturers',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    // Setup default return values
    loadManufacturersUseCaseSpy.getManufacturers.and.returnValue(of(mockManufacturers));
    loadManufacturersUseCaseSpy.getLoadingState.and.returnValue(of(false));
    loadManufacturersUseCaseSpy.getErrorState.and.returnValue(of(null));
    searchManufacturersUseCaseSpy.getFilteredManufacturers.and.returnValue(of(mockManufacturers));

    await TestBed.configureTestingModule({
      imports: [BrandsPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: LoadManufacturersUseCase, useValue: loadManufacturersUseCaseSpy },
        { provide: SearchManufacturersUseCase, useValue: searchManufacturersUseCaseSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    loadManufacturersUseCase = TestBed.inject(
      LoadManufacturersUseCase
    ) as jasmine.SpyObj<LoadManufacturersUseCase>;
    searchManufacturersUseCase = TestBed.inject(
      SearchManufacturersUseCase
    ) as jasmine.SpyObj<SearchManufacturersUseCase>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(BrandsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load manufacturers on init', () => {
    expect(loadManufacturersUseCase.execute).toHaveBeenCalled();
  });

  it('should display manufacturers count', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statsText = compiled.querySelector('.stat-text')?.textContent;
    expect(statsText).toContain('Showing 2 of 2');
  });

  it('should show error in snackbar when error state exists', () => {
    const errorMessage = 'Failed to load manufacturers';
    loadManufacturersUseCase.getErrorState.and.returnValue(of(errorMessage));

    // Create new component to trigger ngOnInit with error
    const errorFixture = TestBed.createComponent(BrandsPageComponent);
    errorFixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith(
      errorMessage,
      'Close',
      jasmine.objectContaining({
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    );
  });

  it('should call searchManufacturersUseCase when search term changes', () => {
    const searchTerm = 'tesla';
    component['onSearchTermChange'](searchTerm);

    expect(searchManufacturersUseCase.execute).toHaveBeenCalledWith(searchTerm);
  });

  it('should navigate to brand detail when brand is selected', () => {
    const manufacturer = mockManufacturers[0];
    component['onBrandSelected'](manufacturer);

    expect(router.navigate).toHaveBeenCalledWith(['/brand', 'Tesla']);
  });

  it('should show progress bar when loading', () => {
    loadManufacturersUseCase.getLoadingState.and.returnValue(of(true));

    const loadingFixture = TestBed.createComponent(BrandsPageComponent);
    loadingFixture.detectChanges();

    const compiled = loadingFixture.nativeElement as HTMLElement;
    const progressBar = compiled.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('should not show progress bar when not loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const progressBar = compiled.querySelector('mat-progress-bar');
    expect(progressBar).toBeFalsy();
  });
});
