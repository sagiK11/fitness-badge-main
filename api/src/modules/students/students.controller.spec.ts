import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
