import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  input,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadBrandDetailsUseCase } from '../../application/use-cases/load-brand-details.use-case';
import { VehicleTypesListComponent } from './components/vehicle-types-list/vehicle-types-list.component';
import { ModelsListComponent } from './components/models-list/models-list.component';

/** Detail page showing vehicle types and models for a manufacturer */
@Component({
  selector: 'app-brand-detail-page',
  imports: [
    MatProgressBarModule,
    MatSnackBarModule,
    VehicleTypesListComponent,
    ModelsListComponent,
  ],
  templateUrl: './brand-detail-page.component.html',
  styleUrl: './brand-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandDetailPageComponent implements OnInit {
  private readonly loadBrandDetailsUseCase = inject(LoadBrandDetailsUseCase);
  private readonly snackBar = inject(MatSnackBar);

  makeName = input<string>(); // Route param: manufacturer name

  protected readonly vehicleTypes = toSignal(
    this.loadBrandDetailsUseCase.getVehicleTypes(),
    { initialValue: [] }
  );

  protected readonly vehicleModels = toSignal(
    this.loadBrandDetailsUseCase.getVehicleModels(),
    { initialValue: [] }
  );

  protected readonly vehicleTypesLoading = toSignal(
    this.loadBrandDetailsUseCase.getVehicleTypesLoadingState(),
    { initialValue: false }
  );

  protected readonly vehicleModelsLoading = toSignal(
    this.loadBrandDetailsUseCase.getVehicleModelsLoadingState(),
    { initialValue: false }
  );

  protected readonly vehicleTypesError = toSignal(
    this.loadBrandDetailsUseCase.getVehicleTypesErrorState(),
    { initialValue: null }
  );

  protected readonly vehicleModelsError = toSignal(
    this.loadBrandDetailsUseCase.getVehicleModelsErrorState(),
    { initialValue: null }
  );

  // Load data when manufacturer name changes
  constructor() {
    effect(() => {
      const name = this.makeName();
      if (name && name.trim().length > 0) {
        this.loadBrandDetailsUseCase.execute(name);
      }
    });
  }

  ngOnInit(): void {
    if (this.vehicleTypesError()) {
      this.showError(this.vehicleTypesError()!);
    }
    if (this.vehicleModelsError()) {
      this.showError(this.vehicleModelsError()!);
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
