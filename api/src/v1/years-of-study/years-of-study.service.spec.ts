import { Test, TestingModule } from '@nestjs/testing';
import { YearsOfStudyService } from './years-of-study.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';
import { ExceptionService } from '@src/utils/result/exception.service';

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
