import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { Result } from './result';

@Injectable()
export class ResultService<Model> {
  constructor(private readonly exceptionService: ExceptionService<Model>) {}

  async handleSuccess<Model>(
    data: Model,
    options?: Partial<Result<Model>>,
  ): Promise<Result<Model>> {
    return new Result<Model>({ data, success: true, ...options });
  }

  async handleError<Model>(e: any, model?: Model): Promise<Result<Model>> {
    return this.exceptionService.handle<Model>(e, model);
  }
}
