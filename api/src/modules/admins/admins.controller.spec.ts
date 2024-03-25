import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller';
import { PrismaService } from '@src/libs/infrastructure/prisma/prisma.service';
import { ExceptionService } from '@src/libs/infrastructure/result/exception.service';
import { ResultService } from '@src/libs/infrastructure/result/result.service';
import { AdminsService } from './admins.service';

describe('AdminsController', () => {
  let controller: AdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsService],
      providers: [
        AdminsService,
        PrismaService,
        ResultService,
        ExceptionService,
      ],
    }).compile();

    controller = module.get<AdminsController>(AdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
