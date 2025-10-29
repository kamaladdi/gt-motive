import { VehicleType } from '../../../domain/models/vehicle-type.model';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';

export interface BrandDetailState {
  currentMakeName: string | null;
  vehicleTypes: VehicleType[];
  vehicleTypesLoading: boolean;
  vehicleTypesError: string | null;
  vehicleModels: VehicleModel[];
  vehicleModelsLoading: boolean;
  vehicleModelsError: string | null;
}

export const initialBrandDetailState: BrandDetailState = {
  currentMakeName: null,
  vehicleTypes: [],
  vehicleTypesLoading: false,
  vehicleTypesError: null,
  vehicleModels: [],
  vehicleModelsLoading: false,
  vehicleModelsError: null,
};
