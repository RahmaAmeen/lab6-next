import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StudentModule,
    CourseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestStudent'),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
      envFilePath: '.env', // default; can omit
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
