import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Result } from './result';

interface IError {
  code?: string;
  message: string;
}
@Injectable()
export class ExceptionService<Model> {
  constructor(private readonly prisma: PrismaService) {}

  async handle<Model>(e: any, model?: Model): Promise<Result<Model>> {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
      if (typeof e.message === 'string') {
        return this.badRequestException(e);
      }
      throw e;
    }
    if (e.code === 'P2025') return this.notFoundExceptionResult<Model>(e);
    return this.badRequestException<Model>(e);
  }

  private badRequestException<Model>(e: IError) {
    return new Result<Model>({
      data: null,
      success: false,
      message: e.message,
      statusCode: 400,
      httpException: new BadRequestException(e),
    });
  }

  private notFoundExceptionResult<Model>(e: IError) {
    return new Result<Model>({
      data: null,
      success: false,
      message: e.message,
      statusCode: 404,
      httpException: new NotFoundException(e.message),
    });
  }
}
