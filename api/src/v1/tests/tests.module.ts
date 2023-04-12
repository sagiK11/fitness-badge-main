import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, ResultModule],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
