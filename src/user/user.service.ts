import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserResponse } from './interface/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }

    const password = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = {
      ...createUserDto,
      password,
      role: createUserDto.role || 'user',
    };
    return {
      status: 201,
      message: 'User created successfully',
      data: await this.userModel.create({ ...CreateUserDto, ...createdUser }),
    };
  }

  findAll() {
    return this.userModel.find().select('-password, -__v').exec(); // Exclude the password field from the response
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password, -__v')
      .exec(); // Exclude the password field from the response
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return { status: 200, message: 'User found successfully', data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { ...updateUserDto },
        { new: true, select: '-password, -__v' },
      )
      .exec(); // Exclude the password field from the response

    return {
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.role === 'user') {
      user.isActive = false;
      await user.save();
    }
    await this.userModel.findByIdAndDelete(id).exec();

    return { status: 200, message: 'User removed successfully' };
  }
}
