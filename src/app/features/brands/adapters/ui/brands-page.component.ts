import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadManufacturersUseCase } from '../../application/use-cases/load-manufacturers.use-case';
import { SearchManufacturersUseCase } from '../../application/use-cases/search-manufacturers.use-case';
import { Manufacturer } from '../../domain/models/manufacturer.model';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { BrandSearchComponent } from './components/brand-search/brand-search.component';

/** Main page for browsing manufacturers with search */
@Component({
  selector: 'app-brands-page',
  imports: [
    MatProgressBarModule,
    MatSnackBarModule,
    BrandsListComponent,
    BrandSearchComponent,
  ],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsPageComponent {
  private readonly loadManufacturersUseCase = inject(LoadManufacturersUseCase);
  private readonly searchManufacturersUseCase = inject(SearchManufacturersUseCase);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly manufacturers = toSignal(
    this.loadManufacturersUseCase.getManufacturers(),
    { initialValue: [] }
  );

  protected readonly filteredManufacturers = toSignal(
    this.searchManufacturersUseCase.getFilteredManufacturers(),
    { initialValue: [] }
  );

  protected readonly loading = toSignal(this.loadManufacturersUseCase.getLoadingState(), {
    initialValue: false,
  });

  protected readonly error = toSignal(this.loadManufacturersUseCase.getErrorState(), {
    initialValue: null,
  });

  protected readonly totalManufacturers = computed(() => this.manufacturers().length);

  constructor() {
    // Load manufacturers on init
    this.loadManufacturersUseCase.execute();

    // Show errors when they occur
    this.loadManufacturersUseCase.getErrorState().subscribe(error => {
      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  protected onSearchTermChange(searchTerm: string): void {
    this.searchManufacturersUseCase.execute(searchTerm);
  }

  protected onBrandSelected(manufacturer: Manufacturer): void {
    this.router.navigate(['/brand', manufacturer.Make_Name]);
  }
}
