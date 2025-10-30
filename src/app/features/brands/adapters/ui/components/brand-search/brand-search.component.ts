import {Component, output, OnInit, ChangeDetectionStrategy, signal, inject, DestroyRef} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { SearchManufacturersUseCase } from '../../../../application/use-cases/search-manufacturers.use-case';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

/** Search input with debounce */
@Component({
  selector: 'app-brand-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './brand-search.component.html',
  styleUrl: './brand-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandSearchComponent implements OnInit {
  private readonly searchUseCase = inject(SearchManufacturersUseCase);
  private readonly dRef = inject(DestroyRef);
  searchTermChange = output<string>();

  protected readonly searchControl = new FormControl<string>('', { nonNullable: true });
  protected readonly hasSearch = signal(false);

  ngOnInit(): void {
    // Restore search term from state
    this.searchUseCase.getSearchTerm()
      .pipe(
        takeUntilDestroyed(this.dRef),
        filter(term => term !== this.searchControl.value)
      )
      .subscribe(term => {
        this.searchControl.setValue(term);
        this.hasSearch.set(!!term);
      });

    // Subscribe to search input changes
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.dRef)
      )
      .subscribe((searchTerm) => {
        this.hasSearch.set(!!searchTerm);
        this.searchTermChange.emit(searchTerm);
      });
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
    this.hasSearch.set(false);
    this.searchTermChange.emit('');
  }
}
