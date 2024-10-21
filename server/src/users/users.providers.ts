import { Connection } from 'mongoose';
import { UsersSchema } from './schemas/users.schema';

export const UsersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
