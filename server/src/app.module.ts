import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FoodFactsModule } from './foodFacts/foodFacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/Users'),
    UserModule,
    AuthModule,
    FoodFactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
