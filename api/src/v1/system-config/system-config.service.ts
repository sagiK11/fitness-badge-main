import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';

@Injectable()
export class SystemConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<any>,
  ) {}
}
