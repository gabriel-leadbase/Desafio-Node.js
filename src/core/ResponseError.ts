export interface ResponseError {
  error: {
    code: string;
    message: string;
    err?: any;
  };
}

export interface ThirtyResponseError {
  error: boolean;
  message: string;
  err?: any;
}

export class Response {
  error(code: string, message: string, err?: any): ResponseError {
    return {
      error: {
        code,
        message,
        err
      }
    };
  }
}
