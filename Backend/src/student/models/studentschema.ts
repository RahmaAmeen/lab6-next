import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { course } from '../../course/models/courseschema';

export type studentDocument = HydratedDocument<student>;
@Schema()
export class student {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 'student' })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }] })
  courses: course[];
}

export const StudentSchema = SchemaFactory.createForClass(student);
