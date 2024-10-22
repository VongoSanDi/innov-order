import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FoodFactsModule } from './foodFacts/foodFacts.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './mongo/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    FoodFactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
