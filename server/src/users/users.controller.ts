import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  CreateUserSchema,
  UpdateUserSchema,
} from './zod/create-user-zod.schema';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserUpdateResponseDto,
} from './dto/user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Create user
   */
  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const validateSchema = CreateUserSchema.safeParse(body);
    if (!validateSchema.success) {
      throw new BadRequestException(validateSchema.error.errors);
    }
    return await this.userService.create(body);
  }

  // @Get(':login')
  // async getUserByLogin(
  //   @Param('login') login: string,
  // ): Promise<LoginResponseDto> {
  //   // Valider le login avec Zod
  //   const validateSchema = LoginParamSchema.safeParse({ login });
  //   if (!validateSchema.success) {
  //     throw new BadRequestException(
  //       validateSchema.error.issues.map((issue) => issue.message).join(', '),
  //     );
  //   }
  //
  //   // Récupérer l'utilisateur
  //   const user = await this.userService.findByLogin(login);
  //   if (!user) {
  //     throw new NotFoundException(`User with login ${login} not found`);
  //   }
  //   return {
  //     id: user._id,
  //     access_token:
  //   };
  // }

  // @Get()
  // async getUsers(): Promise<User[]> {
  //   const result = await this.userService.findAllUsers();
  //   return result;
  // }

  @Patch(':login')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponseDto> {
    const validateSchema = UpdateUserSchema.safeParse({
      ...updateUserDto,
    });
    if (!validateSchema.success) {
      throw new BadRequestException(
        validateSchema.error.errors.map((issue) => issue.message).join(', '),
      );
    }
    const response = await this.userService.update(login, updateUserDto);
    return response;
  }
}
