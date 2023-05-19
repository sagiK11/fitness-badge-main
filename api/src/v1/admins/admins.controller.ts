import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminDto } from './dto/admin.dto';
import { Admin } from '@prisma/client';
import { AdminsService } from './admins.service';

@ApiTags('admins')
@Controller({ path: 'admins', version: '1' })
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Get('/:email/email')
  @ApiOkResponse({ type: AdminDto })
  async findByEmail(@Param('email') email: string): Promise<Admin> {
    const result = await this.adminService.findByEmail(email);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
