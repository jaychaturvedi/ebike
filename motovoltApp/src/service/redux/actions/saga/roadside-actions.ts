export type GetRoadSideAssitance = {
  type: "GetRoadSideAssitance",
  payload: {
    frameId: string;
    description: string;
    lat: number;
    lon: number;
    dist: number;
}
}