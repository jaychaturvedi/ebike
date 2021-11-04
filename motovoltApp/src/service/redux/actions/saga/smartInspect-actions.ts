export type BeginSmartInspection = {
  type: "BeginSmartInspection",
  payload: {
      frameId:string
  }
}
export type BeginAbortInspection = {
  type: "BeginAbortInspection",
  payload: {
      frameId:string
  }
}
export type ClearInspectionReport = {
  type: "ClearInspectionReport",
  payload: {
    name: "smartInspectionReport" | "smartInspectionAbortedReport"
  }
}