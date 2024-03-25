import { Injectable } from '@nestjs/common';
import { PrismaService, ResultService } from '@src/libs/infrastructure';

@Injectable()
export class SystemConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<any>,
  ) {}
}
