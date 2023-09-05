export type FirestoreResult<T> = {
    success: true;
    data: T;
  } | {
    success: false;
    error: Error;
};
  


export enum ErrorCode {
  ReadError= "Failed to read from db",
  InvalidError = "invalid query",
}

export type FirestoreResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ErrorCode;
    };
