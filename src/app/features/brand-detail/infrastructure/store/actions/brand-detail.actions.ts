import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { VehicleType } from '../../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';

export const BrandDetailActions = createActionGroup({
  source: 'Brand Detail',
  events: {
    'Load Vehicle Types': props<{ makeName: string }>(),
    'Load Vehicle Types Success': props<{ makeName: string; vehicleTypes: VehicleType[] }>(),
    'Load Vehicle Types Failure': props<{ error: string }>(),
    'Load Vehicle Models': props<{ makeName: string }>(),
    'Load Vehicle Models Success': props<{ makeName: string; vehicleModels: VehicleModel[] }>(),
    'Load Vehicle Models Failure': props<{ error: string }>(),
    'Clear Brand Detail': emptyProps(),
  },
});
