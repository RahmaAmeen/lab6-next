import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { course } from './models/courseschema';
import { createCourseDto } from './dto/createCourseDto';
import { updateCourseDto } from './dto/updateCourseDto';
import { AuthGuard } from '../auth/guards/authentication.guard';
import { authorizationGaurd } from '../auth/guards/authorization.guard';
import { Role, Roles } from '../auth/decorators/roles.decorator';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}
  //The courseService is injected through the class constructor.
  //Notice the use of the private syntax.
  //This shorthand allows us to both declare and initialize
  //the courseService member immediately in the same location.
  @Get()
  // Get all course
  async getAllcourses(): Promise<course[]> {
    return await this.courseService.findAll();
  }
  @Get(':id') // /courses/:id   // Get a single course by ID
  async getCourseById(@Param('id') id: string) {
    // Get the student ID from the route parameters
    const course = await this.courseService.findById(id);
    if (!course) throw new NotFoundException('course not found');
    return course;
  }
  // Create a new course (admin only)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, authorizationGaurd)
  @Post()
  async createCourse(@Body() courseData: createCourseDto) {
    // Get the new student data from the request body
    const newCourse = await this.courseService.create(courseData);
    return newCourse;
  }
  // Update a course's details
  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() courseData: updateCourseDto,
  ) {
    const updatedCourse = await this.courseService.update(id, courseData);
    return updatedCourse;
  }
  // Delete a course by ID
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    const deletedCourse = await this.courseService.delete(id);
    return deletedCourse;
  }
}
