import { HttpException, HttpStatus } from '@nestjs/common';

export interface IResultOptions<T> {
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

  constructor(options?: IResultOptions<T>) {
    this.data = options.data;
    this.success = options.success;
    this.message = options?.message;
    this.statusCode = options?.statusCode;
    this.httpException = options?.httpException;
  }
}
