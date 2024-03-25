import { Test, TestingModule } from '@nestjs/testing';
import { TestsService } from './tests.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';
import { TestCategoriesService } from '../test-categories/test-categories.service';

describe('TestsService', () => {
  let service: TestsService;

  const mockPrisma = {
    tests: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsService,
        PrismaService,
        ResultService,
        ExceptionService,
        TestCategoriesService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<TestsService>(TestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
