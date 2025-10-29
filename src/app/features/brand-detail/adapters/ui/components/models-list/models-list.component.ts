import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VehicleModel } from '../../../../domain/models/vehicle-model.model';

/** Displays vehicle models list with virtual scroll */
@Component({
  selector: 'app-models-list',
  imports: [MatCardModule, MatListModule, MatIconModule, ScrollingModule],
  templateUrl: './models-list.component.html',
  styleUrl: './models-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsListComponent {
  models = input<VehicleModel[]>([]);
  loading = input<boolean>(false);
  protected readonly useVirtualScroll = computed(() => this.models().length > 50);
}
