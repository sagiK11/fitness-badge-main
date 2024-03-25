import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomsService } from './classrooms.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('ClassroomsService', () => {
  let service: ClassroomsService;

  const mockPrisma = {
    classrooms: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassroomsService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<ClassroomsService>(ClassroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
