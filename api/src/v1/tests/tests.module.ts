import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';
import { TestCategoriesModule } from '../test-categories/test-categories.module';

@Module({
  imports: [PrismaModule, ResultModule, TestCategoriesModule],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
