export interface VehicleTypesApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleTypeApiResult[];
}

export interface VehicleTypeApiResult {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleModelsApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleModelApiResult[];
}

export interface VehicleModelApiResult {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
