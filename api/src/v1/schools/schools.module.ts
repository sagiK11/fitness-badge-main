import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, ResultModule],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
