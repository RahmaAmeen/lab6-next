import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class updateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(20)
  age?: number;
}
