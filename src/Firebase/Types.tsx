export type FirestoreResult<T> = {
    success: true;
    data: T;
  } | {
    success: false;
    error: Error;
  };