import { Component, output, OnInit, OnDestroy, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, filter } from 'rxjs';
import { SearchManufacturersUseCase } from '../../../../application/use-cases/search-manufacturers.use-case';

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
export class BrandSearchComponent implements OnInit, OnDestroy {
  private readonly searchUseCase = inject(SearchManufacturersUseCase);
  searchTermChange = output<string>();

  protected readonly searchControl = new FormControl<string>('', { nonNullable: true });
  protected readonly hasSearch = signal(false);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Restore search term from state
    this.searchUseCase.getSearchTerm()
      .pipe(
        takeUntil(this.destroy$),
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
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.hasSearch.set(!!searchTerm);
        this.searchTermChange.emit(searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
    this.hasSearch.set(false);
    this.searchTermChange.emit('');
  }
}
