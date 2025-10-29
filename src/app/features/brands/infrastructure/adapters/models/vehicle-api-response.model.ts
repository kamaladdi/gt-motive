export interface VehicleApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: VehicleApiMake[];
}

export interface VehicleApiMake {
  Make_ID: number;
  Make_Name: string;
}
