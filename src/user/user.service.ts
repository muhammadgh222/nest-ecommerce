import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { isValidObjectId, Model } from 'mongoose';
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

    const createdUser = await this.userModel.create({
      ...createUserDto,
      password,
      role: createUserDto.role || 'user',
    });

    return {
      status: 201,
      message: 'User created successfully',
      data: createdUser,
    };
  }

  async findAll(query) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }

    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-createdAt');
    return {
      status: 200,
      message: 'Users found successfully',
      length: users.length,
      data: users,
    };
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
    const updateData = { ...updateUserDto };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .select('-password -__v')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

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
