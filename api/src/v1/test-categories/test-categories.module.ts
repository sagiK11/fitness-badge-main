import { Module } from '@nestjs/common';
import { TestCategoriesController } from './test-categories.controller';
import { TestCategoriesService } from './test-categories.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, ResultModule],
  controllers: [TestCategoriesController],
  providers: [TestCategoriesService],
  exports: [TestCategoriesService],
})
export class TestCategoriesModule {}
