import { IsString } from 'class-validator';

export class createCourseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
