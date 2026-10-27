import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { student } from './models/studentschema';
import { createStudentDto } from './dto/createStudentDto';
import { updateStudentDto } from './dto/updateStudentDto';
import { AuthGuard } from '../auth/guards/authentication.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { authorizationGaurd } from '../auth/guards/authorization.guard';

// @UseGuards(AuthGuard) //class level
@Controller('students') // it means anything starts with /student
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Public()
  @Get()
  // Get all students
  async getAllStudents(): Promise<student[]> {
    return await this.studentService.findAll();
  }
  @UseGuards(AuthGuard) // handler level
  @Get('currentUser')
  async getCurrentUser(@Req() { user }): Promise<student | null> {
    const student = await this.studentService.findById(user.userid);
    console.log(student);
    return student;
  }

  @Get('name/:name')
  async getStudentByName(
    @Param('name') name: string,
  ): Promise<student | null> {
    return await this.studentService.findByName(name);
  }

  @Roles(Role.User)
  @UseGuards(AuthGuard, authorizationGaurd) // AuthGuard first so request.user exists
  @Get(':id') // /student/:id
  // Get a single student by ID
  async getStudentById(@Param('id') id: string): Promise<student | null> {
    // Get the student ID from the route parameters
    const student = await this.studentService.findById(id);
    return student;
  }
  // Create a new student
  @Post()
  async createStudent(@Body() studentData: createStudentDto) {
    // Get the new student data from the request body
    const newStudent = await this.studentService.create(studentData);
    return newStudent;
  }
  // Update a student's details
  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentData: updateStudentDto,
  ) {
    const updatedStudent = await this.studentService.update(id, studentData);
    return updatedStudent;
  }
  // Delete a student by ID
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    const deletedStudent = await this.studentService.delete(id);
    return deletedStudent;
  }
}
