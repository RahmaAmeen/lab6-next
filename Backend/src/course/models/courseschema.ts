import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class course {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  name: string;
}
export const CourseSchema = SchemaFactory.createForClass(course);
