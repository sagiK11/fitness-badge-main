import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemConfigService } from './system-config.service';
import { AuthGuard } from '@src/guards/auth.guard';

@ApiTags('system-config')
@Controller({ path: 'system-config', version: '1' })
@UseGuards(AuthGuard)
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}
}
