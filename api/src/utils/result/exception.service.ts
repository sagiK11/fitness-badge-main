import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Result } from './result';

@Injectable()
export class ExceptionService<Model> {
  constructor(private readonly prisma: PrismaService) {}

  async handle<Model>(e: any, model?: Model): Promise<Result<Model>> {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError)) throw e;
    if (e.code === 'P2002') return this.uniqueExceptionResult<Model>();
    if (e.code === 'P2003') return this.foreignKeyExceptionResult<Model>();
    if (e.code === 'P2025') return this.notFoundExceptionResult<Model>();
    return this.badRequestException<Model>();
  }

  private badRequestException<Model>() {
    return new Result<Model>({
      data: null,
      success: false,
      message: 'Bad request,',
      statusCode: 400,
      httpException: new BadRequestException(),
    });
  }

  private uniqueExceptionResult<Model>() {
    return new Result<Model>({
      data: null,
      success: false,
      message: 'There is a unique constraint violation,',
      statusCode: 400,
      httpException: new BadRequestException(),
    });
  }

  private foreignKeyExceptionResult<Model>() {
    return new Result<Model>({
      data: null,
      success: false,
      message: 'Foreign key constraint failed on the field',
      statusCode: 400,
      httpException: new BadRequestException(),
    });
  }

  private notFoundExceptionResult<Model>() {
    return new Result<Model>({
      data: null,
      success: false,
      message: 'Not found',
      statusCode: 404,
      httpException: new NotFoundException(),
    });
  }
}
