import { Test, TestingModule } from '@nestjs/testing';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';
import { TestCategoriesService } from '../test-categories/test-categories.service';

describe('TestsController', () => {
  let controller: TestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsController],
      providers: [
        TestsService,
        PrismaService,
        ResultService,
        ExceptionService,
        TestCategoriesService,
      ],
    }).compile();

    controller = module.get<TestsController>(TestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
