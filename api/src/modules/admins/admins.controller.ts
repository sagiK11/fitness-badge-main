import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminDto } from './dto/admin.dto';
import { Admin } from '@prisma/client';
import { AdminsService } from './admins.service';
import { AuthGuard } from '@src/libs/guards/auth.guard';

@ApiTags('admins')
@Controller({ path: 'admins', version: '1' })
@UseGuards(AuthGuard)
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Get('/:email/email')
  @ApiOkResponse({ type: AdminDto })
  async findByEmail(@Param('email') email: string): Promise<Admin> {
    const result = await this.adminService.findByEmail(email);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get()
  @ApiOkResponse({ type: AdminDto, isArray: true })
  async findAll(): Promise<Admin[]> {
    const result = await this.adminService.findAll();
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
