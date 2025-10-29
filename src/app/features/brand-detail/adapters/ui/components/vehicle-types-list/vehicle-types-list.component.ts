import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { VehicleType } from '../../../../domain/models/vehicle-type.model';

interface VehicleTypeWithCount {
  VehicleTypeId: number;
  VehicleTypeName: string;
  count: number;
}

/** Displays vehicle types as chips with count */
@Component({
  selector: 'app-vehicle-types-list',
  imports: [MatCardModule, MatChipsModule, MatBadgeModule],
  templateUrl: './vehicle-types-list.component.html',
  styleUrl: './vehicle-types-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleTypesListComponent {
  vehicleTypes = input<VehicleType[]>([]);
  loading = input<boolean>(false);

  groupedVehicleTypes = computed(() => {
    const types = this.vehicleTypes();
    const grouped = new Map<number, VehicleTypeWithCount>();

    types.forEach((type) => {
      const existing = grouped.get(type.VehicleTypeId);
      if (existing) {
        existing.count++;
      } else {
        grouped.set(type.VehicleTypeId, {
          VehicleTypeId: type.VehicleTypeId,
          VehicleTypeName: type.VehicleTypeName,
          count: 1,
        });
      }
    });

    return Array.from(grouped.values()).sort((a, b) => b.count - a.count);
  });

  uniqueTypesCount = computed(() => this.groupedVehicleTypes().length);
}
