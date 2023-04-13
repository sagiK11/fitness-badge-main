import { Module } from '@nestjs/common';
import { SystemConfigController } from './system-config.controller';
import { SystemConfigService } from './system-config.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, ResultModule],
  controllers: [SystemConfigController],
  providers: [SystemConfigService],
})
export class SystemConfigModule {}
