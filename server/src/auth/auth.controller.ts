import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/user.dto';
import { CreateUserSchema } from '@/users/zod/create-user-zod.schema';
import { LoginResponseDto } from '@/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<LoginResponseDto> {
    const validateSchema = CreateUserSchema.safeParse(body);

    if (!validateSchema.success) {
      throw new BadRequestException(
        validateSchema.error.issues.map((issue) => issue.message).join(', '),
      );
    }
    const { login, password } = validateSchema.data;
    try {
      const validateUser = await this.userService.validateUser(login, password);

      const userWithToken: LoginResponseDto =
        this.userService.login(validateUser);

      return userWithToken;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('An unexpected issue occured');
      }
    }
  }
}
