import { HttpException, HttpStatus } from '@nestjs/common';

export interface ResultOptions<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode?: HttpStatus;
  httpException?: HttpException;
}

export class Result<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode?: HttpStatus;
  httpException?: HttpException;

  constructor(options?: ResultOptions<T>) {
    this.data = options.data;
    this.success = options.success;
    this.message = options?.message;
    this.statusCode = options?.statusCode;
    this.httpException = options?.httpException;
  }
}
