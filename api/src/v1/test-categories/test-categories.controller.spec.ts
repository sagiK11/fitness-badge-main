import { Test, TestingModule } from '@nestjs/testing';
import { TestCategoriesController } from './test-categories.controller';

describe('TestCategoriesController', () => {
  let controller: TestCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCategoriesController],
    }).compile();

    controller = module.get<TestCategoriesController>(TestCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
