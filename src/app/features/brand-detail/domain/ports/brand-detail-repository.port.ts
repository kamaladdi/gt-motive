import { Observable } from 'rxjs';
import { VehicleType } from '../models/vehicle-type.model';
import { VehicleModel } from '../models/vehicle-model.model';

/** Contract for brand detail data access */
export interface IBrandDetailRepository {
  getVehicleTypesForMake(makeName: string): Observable<VehicleType[]>;
  getModelsForMake(makeName: string): Observable<VehicleModel[]>;
}
