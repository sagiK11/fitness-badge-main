import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('TeachersService', () => {
  let service: TeachersService;

  const mockPrisma = {
    teachers: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
