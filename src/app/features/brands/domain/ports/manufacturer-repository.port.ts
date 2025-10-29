import { Observable } from 'rxjs';
import { Manufacturer } from '../models/manufacturer.model';

export abstract class ManufacturerRepository {
  abstract getAllManufacturers(): Observable<Manufacturer[]>;
}