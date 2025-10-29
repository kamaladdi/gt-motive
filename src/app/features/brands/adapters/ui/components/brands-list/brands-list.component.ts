import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Manufacturer } from '../../../../domain/models/manufacturer.model';

/** Manufacturers list with virtual scroll */
@Component({
  selector: 'app-brands-list',
  imports: [ScrollingModule, MatCardModule, MatIconModule],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListComponent {
  manufacturers = input.required<Manufacturer[]>();
  brandSelected = output<Manufacturer>();

  protected selectBrand(manufacturer: Manufacturer): void {
    this.brandSelected.emit(manufacturer);
  }
}
