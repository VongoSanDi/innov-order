import * as mongoose from 'mongoose';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      if (process.env.NODE_ENV === 'test') {
        // Retourner un mock ou une connexion à une base de test
        return {} as any;
      }
      return await mongoose.connect('mongodb://localhost:27017/Users');
    },
  },
];

