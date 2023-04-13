import { Test, TestingModule } from '@nestjs/testing';
import { TestCategoriesService } from './test-categories.service';

describe('TestCategoriesService', () => {
  let service: TestCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCategoriesService],
    }).compile();

    service = module.get<TestCategoriesService>(TestCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
