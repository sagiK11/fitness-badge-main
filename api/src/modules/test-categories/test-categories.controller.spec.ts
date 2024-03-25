import { Test, TestingModule } from '@nestjs/testing';
import { TestCategoriesController } from './test-categories.controller';
import { TestCategoriesService } from './test-categories.service';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('TestCategoriesController', () => {
  let controller: TestCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCategoriesController],
      providers: [
        TestCategoriesService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    }).compile();

    controller = module.get<TestCategoriesController>(TestCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
