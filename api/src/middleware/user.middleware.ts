import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import hkdf from '@panva/hkdf';
import { Admin, Student, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Role, roles } from '@src/utils';
import { Request, Response, NextFunction } from 'express';
import { jwtDecrypt } from 'jose';
import { JwtPayload as BaseJwtPayload, jwtDecode } from 'jwt-decode';

type JwtPayload = BaseJwtPayload & { email: string };

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const role = this.assertRole(req) as Role;

    const assert: Record<Role, () => Promise<Admin | Teacher | Student>> = {
      admin: () => this.assertAdmin(req),
      teacher: () => this.assertTeacher(req),
      student: () => this.assertStudent(req),
    };

    await assert[role]();

    next();
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

  private async assertUser<T>(role: string, email: string): Promise<T> {
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
    } else if (req.headers.cookie) {
      const role = this.getRole(req) as Role;
      const sessionToken = this.getSessionToken(req.headers.cookie);
      const token = await this.decryptNextAuthToken(role, sessionToken);
      payload = this.decode(token);
    }

    if (!payload?.email) {
      return null;
    }
    return payload;
  }

  private async getUser<T>(role: string, email: string): Promise<T> {
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

  private async decryptNextAuthToken(role: Role, encryptedToken: string) {
    const secret =
      role === 'admin'
        ? process.env.ADMIN_NEXTAUTH_SECRET
        : process.env.APP_NEXTAUTH_SECRET;

    const encryptionSecret = await hkdf(
      'sha256',
      secret,
      '',
      'NextAuth.js Generated Encryption Key',
      32,
    );

    const { payload } = await jwtDecrypt(encryptedToken, encryptionSecret, {
      clockTolerance: 15,
    });

    return payload.id_token as string;
  }

  private decode(token: string) {
    return jwtDecode<JwtPayload>(token);
  }

  private getSessionToken(cookies: string) {
    return this.parseCookie(cookies)['next-auth.session-token'];
  }

  private parseCookie(rawCookies: string) {
    const cookies: Record<string, string> = {};
    const cookieParts = rawCookies.split(';');

    for (const cookie of cookieParts) {
      const [key, value] = cookie.trim().split('=');
      cookies[key] = value;
    }

    return cookies;
  }
}
