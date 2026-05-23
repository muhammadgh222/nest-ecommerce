import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsUrl,
  IsNumber,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(30, { message: 'Name must be at most 30 characters' })
  name!: string;
  // Email
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email!: string;
  // Password
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password!: string;
  // Role
  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  @IsEnum(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: string;
  // Avatar URL
  @IsOptional()
  @IsString({ message: 'Avatar URL must be a string' })
  @IsUrl({}, { message: 'Avatar URL must be a valid URL' })
  avatarUrl?: string;
  // Age
  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  age?: string;
  // Address
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
  // Phone
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @IsPhoneNumber('EG', { message: 'Phone must be a valid phone number' })
  phone?: string;
  // isActive
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsEnum([true, false], { message: 'isActive must be a boolean' })
  isActive?: boolean;
  // Verification Token
  @IsOptional()
  @IsString({ message: 'Verification token must be a string' })
  verificationToken?: string;
  // Gender
  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  @IsEnum(['Male', 'Female'], {
    message: 'Gender must be either Male or Female',
  })
  gender?: string;
}
