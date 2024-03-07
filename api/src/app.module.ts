import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { V1Module } from './v1/v1.module';
import { StudentsModule } from './v1/students/students.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [PrismaModule, V1Module, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
