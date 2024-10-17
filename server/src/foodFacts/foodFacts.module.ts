import { Module } from '@nestjs/common';
import { FoodFactsController } from './foodFacts.controller';
import { FoodFactsService } from './foodFacts.service';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10000,
      max: 3,
    }),
    ConfigModule,
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
  controllers: [FoodFactsController],
  providers: [
    FoodFactsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class FoodFactsModule { }
