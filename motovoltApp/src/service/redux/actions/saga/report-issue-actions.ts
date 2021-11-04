export type GetReportIssueCategory = {
  type: "GetReportIssueCategory",
  payload: {}
}

export type GetReportedIssues = {
  type: "GetReportedIssues",
  payload: {
    frameId: string,
  }
}

export type CancelReportedIssue = {
  type: "CancelReportedIssue",
  payload: {
    issueId: number,
  }
}

export type GetIssueConversation = {
  type: "GetIssueConversation",
  payload: {
    issueId: number,
  }
}

export type ReportAnIssue = {
  type: "ReportAnIssue",
  payload: {
    frameId: string,
    issueId: number,
    categoryId: number,
    type: string,
    raiseIssue: {
      text:string,
      type:"T" | "A" | "I"
    }[],
  }
}

