import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';

@Module({
  imports: [PrismaModule, ResultModule],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
