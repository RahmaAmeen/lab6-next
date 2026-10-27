import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { course } from './models/courseschema';
import { updateCourseDto } from './dto/updateCourseDto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(course.name) private courseModel: mongoose.Model<course>,
  ) {}

  async create(courseData: course): Promise<course> {
    const newCourse = new this.courseModel(courseData);
    return await newCourse.save();
  }
  async findAll(): Promise<course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }
  async findById(id: string): Promise<course | null> {
    return await this.courseModel.findById(id);
  }
  async update(
    id: string,
    updateData: updateCourseDto,
  ): Promise<course | null> {
    const course = this.courseModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return course;
  }
  async delete(id: string): Promise<course | null> {
    return await this.courseModel.findByIdAndDelete(id);
  }
}
