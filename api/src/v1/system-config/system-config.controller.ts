import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemConfigService } from './system-config.service';

@ApiTags('system-config')
@Controller({ path: 'system-config', version: '1' })
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}
}
