import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';
import { SchoolsService } from './schools.service';

describe('SchoolsController', () => {
  let controller: SchoolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        SchoolsService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    }).compile();

    controller = module.get<SchoolsController>(SchoolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
