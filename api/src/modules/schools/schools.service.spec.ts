import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('SchoolsService', () => {
  let service: SchoolsService;

  const mockPrisma = {
    schools: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<SchoolsService>(SchoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
