import { course } from '../../course/models/courseschema';
import { IsArray, IsEmail, IsInt, IsString, Min } from 'class-validator';

export class createStudentDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(20)
  age: number;

  @IsString()
  role: string;

  @IsArray()
  courses: course[];

  @IsString()
  password: string;
}
