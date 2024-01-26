import { Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Admin>,
  ) {}

  async findByEmail(email: string) {
    try {
      const resultData = await this.prisma.admin.findUnique({
        where: {
          email,
        },
      });
      return this.resultService.handleSuccess<Admin>(resultData);
    } catch (e) {
      return this.resultService.handleError<Admin>(e);
    }
  }

  async findAll() {
    try {
      const resultData = await this.prisma.admin.findMany();
      return this.resultService.handleSuccess<Admin[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Admin[]>(e);
    }
  }
}
