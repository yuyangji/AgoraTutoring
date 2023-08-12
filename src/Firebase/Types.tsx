export type FirestoreResult<T> = {
    success: true;
    data: T;
  } | {
    success: false;
    error: Error;
};
  


export enum ErrorCode {
  ReadError,
  InvalidError,
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
