import { DatabaseModule } from '@/mongo/database.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService, JwtModule, ...UsersProviders],
})
export class UsersModule {}

