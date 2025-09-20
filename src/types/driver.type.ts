export interface Driver {
  vehicleInfo: VehicleInfo;
  location: Location;
  _id: string;
  userId: string;
  licenseNumber: string;
  approvalStatus: string;
  isOnline: boolean;
  earnings: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VehicleInfo {
  type: string;
  model: string;
  plateNumber: string;
}

export interface Location {
  lat: number;
  lng: number;
}
