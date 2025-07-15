export enum Region {
  Central = "Central",
  East = "East",
  North = "North",
  NorthEast = "North East",
  West = "West",
}

export interface Location {
  name: string;
  region: Region;
  address: string;
  latLng: { lat: number; lng: number };
  days: string[];
  times: string[];
  imgDetail: { src: string; alt: string };
}
