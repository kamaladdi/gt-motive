import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { BrandDetailPageComponent } from './brand-detail-page.component';
import { LoadBrandDetailsUseCase } from '../../application/use-cases/load-brand-details.use-case';
import { VehicleType } from '../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../domain/models/vehicle-model.model';

describe('BrandDetailPageComponent', () => {
  let component: BrandDetailPageComponent;
  let fixture: ComponentFixture<BrandDetailPageComponent>;
  let loadBrandDetailsUseCase: jasmine.SpyObj<LoadBrandDetailsUseCase>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Car' },
    { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
  ];

  const mockVehicleModels: VehicleModel[] = [
    { Model_ID: 1, Model_Name: 'Model S', Make_ID: 1, Make_Name: 'Tesla' },
    { Model_ID: 2, Model_Name: 'Model 3', Make_ID: 1, Make_Name: 'Tesla' },
  ];

  beforeEach(async () => {
    const loadBrandDetailsUseCaseSpy = jasmine.createSpyObj('LoadBrandDetailsUseCase', [
      'execute',
      'getVehicleTypes',
      'getVehicleModels',
      'getVehicleTypesLoadingState',
      'getVehicleModelsLoadingState',
      'getVehicleTypesErrorState',
      'getVehicleModelsErrorState',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    // Setup default return values
    loadBrandDetailsUseCaseSpy.getVehicleTypes.and.returnValue(of(mockVehicleTypes));
    loadBrandDetailsUseCaseSpy.getVehicleModels.and.returnValue(of(mockVehicleModels));
    loadBrandDetailsUseCaseSpy.getVehicleTypesLoadingState.and.returnValue(of(false));
    loadBrandDetailsUseCaseSpy.getVehicleModelsLoadingState.and.returnValue(of(false));
    loadBrandDetailsUseCaseSpy.getVehicleTypesErrorState.and.returnValue(of(null));
    loadBrandDetailsUseCaseSpy.getVehicleModelsErrorState.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [BrandDetailPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: LoadBrandDetailsUseCase, useValue: loadBrandDetailsUseCaseSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    loadBrandDetailsUseCase = TestBed.inject(
      LoadBrandDetailsUseCase
    ) as jasmine.SpyObj<LoadBrandDetailsUseCase>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(BrandDetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show vehicle types error in snackbar on init', () => {
    const errorMessage = 'Failed to load vehicle types';
    loadBrandDetailsUseCase.getVehicleTypesErrorState.and.returnValue(of(errorMessage));

    const errorFixture = TestBed.createComponent(BrandDetailPageComponent);
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

  it('should show vehicle models error in snackbar on init', () => {
    const errorMessage = 'Failed to load vehicle models';
    loadBrandDetailsUseCase.getVehicleModelsErrorState.and.returnValue(of(errorMessage));

    const errorFixture = TestBed.createComponent(BrandDetailPageComponent);
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

  it('should display vehicle types loading bar when loading', () => {
    loadBrandDetailsUseCase.getVehicleTypesLoadingState.and.returnValue(of(true));

    const loadingFixture = TestBed.createComponent(BrandDetailPageComponent);
    loadingFixture.detectChanges();

    const compiled = loadingFixture.nativeElement as HTMLElement;
    const progressBars = compiled.querySelectorAll('mat-progress-bar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should have vehicleTypes signal with initial empty value', () => {
    expect(component['vehicleTypes']()).toEqual([]);
  });

  it('should have vehicleModels signal with initial empty value', () => {
    expect(component['vehicleModels']()).toEqual([]);
  });

  it('should have vehicleTypesLoading signal with initial false value', () => {
    expect(component['vehicleTypesLoading']()).toBe(false);
  });

  it('should have vehicleModelsLoading signal with initial false value', () => {
    expect(component['vehicleModelsLoading']()).toBe(false);
  });

  it('should have vehicleTypesError signal with initial null value', () => {
    expect(component['vehicleTypesError']()).toBeNull();
  });

  it('should have vehicleModelsError signal with initial null value', () => {
    expect(component['vehicleModelsError']()).toBeNull();
  });
});
