import * as mongoose from 'mongoose';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
      try {
        const uri = configService.get<string>('MONGODB_URI') || 'mongodb://mongodb:27017/Users';
        const connection = await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB.');
        return connection;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    },
  },
];
