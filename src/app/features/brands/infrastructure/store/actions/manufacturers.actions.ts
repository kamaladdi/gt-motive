import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

export const ManufacturersActions = createActionGroup({
  source: 'Manufacturers',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ manufacturers: Manufacturer[] }>(),
    'Load Failure': props<{ error: string }>(),
    'Filter': props<{ searchTerm: string }>(),
  },
});