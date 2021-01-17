export type BeginSmartInspection = {
  type: "BeginSmartInspection",
  payload: {
      frameId:string
  }
}

export type UpdateSmartInspectionProgress = {
  type: "UpdateSmartInspectionProgress",
  payload: {
      percent:number
  }
}