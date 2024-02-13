export interface IBorough {
  name: string;
  featureData: {
    type: string;
    properties: {
      id?: number;
      name: string;
      code: string;
      area_hectares: number;
      inner_statistical: boolean;
    };
    geometry: {
      type: string;
      coordinates: [number, number][][][];
    };
  };
}
