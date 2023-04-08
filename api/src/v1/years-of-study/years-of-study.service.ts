import { Injectable } from '@nestjs/common';
import { YearOfStudy } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class YearsOfStudyService {
  constructor(private readonly prisma: PrismaService) {}
}
