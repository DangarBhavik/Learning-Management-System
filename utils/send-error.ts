import { NextResponse } from 'next/server';
import ApiError from './api-error';
import ApiResponse from './api-response';

const sendError = (error: any, optionalMessage: string) => {
  const errorMessage =
    optionalMessage || (error instanceof ApiError ? error.message : optionalMessage);
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const errorData = error instanceof ApiError ? error.data : {};

  return NextResponse.json(new ApiResponse(statusCode, errorMessage, errorData), {
    status: statusCode,
  });
};

export default sendError;
