import { Module } from '@nestjs/common';
import { TestCategoriesController } from './test-categories.controller';
import { TestCategoriesService } from './test-categories.service';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';

@Module({
  imports: [PrismaModule, ResultModule],
  controllers: [TestCategoriesController],
  providers: [TestCategoriesService],
  exports: [TestCategoriesService],
})
export class TestCategoriesModule {}
