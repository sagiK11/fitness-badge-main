import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('TeachersController', () => {
  let controller: TeachersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachersController],
      providers: [
        TeachersService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    }).compile();

    controller = module.get<TeachersController>(TeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
