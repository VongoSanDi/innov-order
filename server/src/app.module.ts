import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FoodFactsModule } from './foodFacts/foodFacts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/Users'),
    UsersModule,
    AuthModule,
    FoodFactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
