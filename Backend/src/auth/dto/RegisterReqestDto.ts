import { course } from '../../course/models/courseschema';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(20)
  age: number;

  @IsArray()
  courses: course[] = [];

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: string = 'student';
}
