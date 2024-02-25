import { Injectable, Logger } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { Result } from './result';

@Injectable()
export class ResultService<Model> {
  private readonly logger = new Logger(ResultService.name);

  constructor(private readonly exceptionService: ExceptionService<Model>) {}

  async handleSuccess<Model>(
    data: Model = null,
    options?: Partial<Result<Model>>,
  ): Promise<Result<Model>> {
    return new Result<Model>({ data, success: true, ...options });
  }

  async handleError<Model>(e: any, model?: Model): Promise<Result<Model>> {
    this.logger.error('handleError:', e);
    return this.exceptionService.handle<Model>(e, model);
  }
}
