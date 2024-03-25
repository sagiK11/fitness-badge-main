import { Test, TestingModule } from '@nestjs/testing';
import { YearsOfStudyService } from './years-of-study.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('YearsOfStudyService', () => {
  let service: YearsOfStudyService;

  const mockPrisma = {
    yearsOfStudy: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YearsOfStudyService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<YearsOfStudyService>(YearsOfStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
