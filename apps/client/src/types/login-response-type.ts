export interface ResponseProps<T> {
  status: "success" | "failure";
  msg?: string;
  data: T;
}

export enum RESPONSESTATUSENUM {
  SUCCESS = "success",
  FALLURE = "failure",
}
