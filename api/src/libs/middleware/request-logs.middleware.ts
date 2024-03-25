import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  async use(req: Request, res: Response, next: NextFunction) {
    let level = 'log';
    const msg = `${req.headers['x-role']} ${req.baseUrl} ${req.method} ${res.statusCode}`;

    if (res.statusCode >= 500) {
      level = 'error';
    } else if (res.statusCode >= 400) {
      level = 'warn';
    }

    this.logger[level](msg);

    next();
  }
}
