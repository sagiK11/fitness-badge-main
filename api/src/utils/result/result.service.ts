import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { Result } from './result';

@Injectable()
export class ResultService<Model> {
  constructor(private readonly exceptionService: ExceptionService<Model>) {}

  async handle<Model>(options: Result<Model>): Promise<Result<Model>> {
    return new Result<Model>(options);
  }

  async handleException<Model>(e: any, model?: Model): Promise<Result<Model>> {
    return this.exceptionService.handle<Model>(e, model);
  }
}
