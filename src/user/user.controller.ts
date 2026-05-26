import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorator/roles.decorator';
import { ParseMongoIdPipe } from 'src/common/parse.mongoId.pipe';

@Controller('user')
@Roles('admin') // Only allow users with the 'admin' role to access this route
@UseGuards(AuthGuard) // Apply the AuthGuard to protect this route
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @func create - Create a new user (admin only)
  // @route POST /user
  // @access private (admin only)

  @Post()
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  // @func getAll - Get all users (admin only)
  // @route GET /user
  // @access private (admin only)

  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query); // Exclude the password field from the response
  }

  // @func getOne - Get a user by ID (admin only)
  // @route GET /user/:id
  // @access private (admin only)

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  // @func update - Update a user by ID (admin only)
  // @route PATCH /user/:id
  // @access private (admin only)
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // @func remove - Delete a user by ID (admin only)
  // @route DELETE /user/:id
  // @access private (admin only)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
