export type GetBookingServiceProviders = {
  type: "GetBookedServiceList",
  payload: {
      frameId:string
  }
}
// Method : GET, /raisedIssueDetails?frameId=<>
export type GetPastIssuesList = {
  type: "GetPastIssuesList",
  payload: {
      frameId:string
  }
}

export type GetBookingTimeSlot = {
  type: "GetBookingTimeSlot",
  payload: {
    slotGroupId : number
  }
}

export type OnBookingService = {
  type: "OnBookingService",
  payload: {
    frameId: string;
    serviceProviderId: number;
    serviceTypeId: number;
    serviceDate: string;
  }
}

export type OnCancelService = {
  type: "OnCancelService",
  payload: {
    serviceId:number
  }
}

