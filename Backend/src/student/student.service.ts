import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { student, studentDocument } from './models/studentschema';
import { updateStudentDto } from './dto/updateStudentDto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(student.name) private studentModel: mongoose.Model<student>,
  ) {}
  async create(studentData: student): Promise<studentDocument> {
    const newStudent = new this.studentModel(studentData); // Create a new student document
    const user = await newStudent.save();
    return user; // Save it to the database
  }
  async findByName(name: string): Promise<studentDocument | null> {
    return await this.studentModel.findOne({ name });
  }
  async findByEmail(email: string): Promise<studentDocument | null> {
    const user = await this.studentModel.findOne({ email });
    return user;
  }
  // Get all students
  async findAll(): Promise<studentDocument[]> {
    const students = await this.studentModel.find(); 
    console.log(students);
    return students;
  }

  // Get a student by ID
  async findById(id: string): Promise<studentDocument | null> {
    console.log(id);
    const student = await this.studentModel.findById(id); // Fetch a student by ID
    return student;
  }

  // Update a student's details by ID
  async update(
    id: string,
    updateData: updateStudentDto,
  ): Promise<studentDocument | null> {
    return await this.studentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }); // Find and update the student
  }

  // Delete a student by ID
  async delete(id: string): Promise<studentDocument | null> {
    return await this.studentModel.findByIdAndDelete(id); // Find and delete the student
  }
}
