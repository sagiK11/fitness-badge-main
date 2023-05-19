import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, ResultModule],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
