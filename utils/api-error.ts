class ApiError extends Error {
  statusCode: number;
  data: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    if (data) {
      this.data = data;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
