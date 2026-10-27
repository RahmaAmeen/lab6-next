import { IsString } from 'class-validator';

export class updateCourseDto {
  @IsString()
  name: string;
}
