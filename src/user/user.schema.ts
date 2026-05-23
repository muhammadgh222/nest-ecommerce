import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, minlength: 3, maxlength: 30 })
  name!: string;
  @Prop({ type: String, required: true, unique: true })
  email!: string;
  @Prop({ type: String, required: true, minlength: 6, maxlength: 20 })
  password!: string;
  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role?: string;
  @Prop({ type: String, default: '' })
  avatarUrl?: string;
  @Prop({ type: String, default: '' })
  age?: string;
  @Prop({ type: String, default: '' })
  address?: string;
  @Prop({ type: String, default: '' })
  phone?: string;
  @Prop({ type: Boolean, default: false })
  isActive?: boolean;
  @Prop({ type: String, default: '' })
  verificationToken?: string;
  @Prop({ type: String, enum: ['Male', 'Female'] })
  gender?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
