import { Test, TestingModule } from '@nestjs/testing';
import { SystemConfigService } from './system-config.service';
import { PrismaService, ResultService } from '@src/libs/infrastructure';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('SystemConfigService', () => {
  let service: SystemConfigService;

  const mockPrisma = {
    configs: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemConfigService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<SystemConfigService>(SystemConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
