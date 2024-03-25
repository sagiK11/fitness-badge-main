import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';
import { TestCategoriesModule } from '../test-categories/test-categories.module';

@Module({
  imports: [PrismaModule, ResultModule, TestCategoriesModule],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
