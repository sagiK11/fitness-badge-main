import { Test, TestingModule } from '@nestjs/testing';
import { TestCategoriesService } from './test-categories.service';
import { TestCategoriesController } from './test-categories.controller';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('TestCategoriesService', () => {
  let service: TestCategoriesService;

  const mockPrisma = {
    testCategory: {
      findUnique: () =>
        Promise.resolve({
          id: '09ea4e2f-d2ed-481e-8f6b-ef01103ad4cf',
          name: 'קוביות זריזות',
          alias: 'cubes-quickness',
        }),
    },
    categoryScoreResult: {
      findFirst: () =>
        Promise.resolve({
          id: '0317cc64-c3cd-4ffb-9220-395d8c617b71',
          maleScore: 88,
          maleGrade: 77,
        }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCategoriesController],
      providers: [
        TestCategoriesService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<TestCategoriesService>(TestCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
