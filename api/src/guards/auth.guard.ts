import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin, Student, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Role, roles } from '@src/utils';
import { Request } from 'express';
import { JwtPayload as BaseJwtPayload, jwtDecode } from 'jwt-decode';

type JwtPayload = BaseJwtPayload & { email: string };
type User = Admin | Teacher | Student;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = this.assertRole(req) as Role;

    const assert: Record<Role, () => Promise<User>> = {
      admin: () => this.assertAdmin(req),
      teacher: () => this.assertTeacher(req),
      student: () => this.assertStudent(req),
    };

    const result = await assert[role]();

    return Boolean(result?.id);
  }

  private async assertAdmin(req: Request) {
    await this.assertApiKey(req);
    const payload = await this.assertToken(req);
    return await this.assertUser<Admin>('admin', payload.email);
  }

  private async assertTeacher(req: Request) {
    const payload = await this.assertToken(req);
    return await this.assertUser<Teacher>('teacher', payload.email);
  }

  private async assertStudent(req: Request) {
    // TODO for students app in the future
    return Promise.resolve(null);
  }

  private assertRole(req: Request) {
    const role = this.getRole(req);
    if (!role) {
      throw new UnauthorizedException('Role not supported');
    }
    return role;
  }

  private async assertToken(req: Request) {
    const token = await this.getToken(req);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    return token;
  }

  private async assertUser<T extends User>(
    role: string,
    email: string,
  ): Promise<T> {
    const user = await this.getUser<T>(role, email);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    return user;
  }

  private async assertApiKey(req: Request) {
    const isApiKeyValid = this.isApiKeyValid(req);
    if (!isApiKeyValid) {
      throw new UnauthorizedException('Invalid api key');
    }
    return isApiKeyValid;
  }

  private isApiKeyValid(req: Request): boolean {
    const apiKey = req.headers['x-api-key'];
    return typeof apiKey === 'string' && apiKey === process.env.X_API_KEY;
  }

  private getRole(req: Request): string {
    const role = req.headers['x-role'];
    if (typeof role !== 'string' || !roles.includes(role as Role)) {
      return null;
    }
    return role;
  }

  private async getToken(req: Request) {
    let payload: { email: string } & JwtPayload = null;
    if (req.headers.authorization) {
      payload = this.decode(req.headers.authorization.slice(7));
    }

    if (!payload?.email) {
      return null;
    }
    return payload;
  }

  private async getUser<T extends User>(
    role: string,
    email: string,
  ): Promise<T> {
    const user = await this.prisma[role].findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  private decode(token: string) {
    return jwtDecode<JwtPayload>(token);
  }
}
