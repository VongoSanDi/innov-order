import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { AuthController } from '@/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/schemas/users.schema';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Name of the guard
    JwtModule.registerAsync({
      imports: [ConfigModule], // Allow configService to be used
      inject: [ConfigService], // Inject the service
      useFactory: async (configService: ConfigService) => ({
        // useFactory allow me to setup the jwt module and wait for the config to inject the JWT_SECRET
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, JwtStrategy],
})
export class AuthModule { }
