export interface Ride {
  pickup: Pickup;
  destination: Destination;
  _id: string;
  riderId: RiderId;
  status: string;
  fare: number;
  requestedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pickup {
  coordinates: Coordinates;
  address: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  coordinates: Coordinates2;
  address: string;
}

export interface Coordinates2 {
  lat: number;
  lng: number;
}

export interface RiderId {
  _id: string;
  name: string;
}
