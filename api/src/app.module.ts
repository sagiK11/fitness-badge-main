import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import {
  AdminsModule,
  ClassroomsModule,
  HelloModule,
  SchoolsModule,
  StudentsModule,
  SystemConfigModule,
  TeachersModule,
  TestCategoriesModule,
  TestsModule,
  YearsOfStudyModule,
} from './modules';
import { RequestLogsMiddleware } from './libs';

@Module({
  imports: [
    AdminsModule,
    ClassroomsModule,
    HelloModule,
    SchoolsModule,
    StudentsModule,
    SystemConfigModule,
    TeachersModule,
    TestCategoriesModule,
    TestsModule,
    YearsOfStudyModule,
    // add here more
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogsMiddleware).forRoutes('*');
  }
}
