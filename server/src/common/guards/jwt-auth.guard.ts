import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any): any {
    // 'err' hold all the auth errors
    // 'user' if it exists, hold authentified user
    // 'info' have additional informations

    if (err) {
      throw err; // Laisse NestJS gérer l'erreur
    }

    if (!user) {
      if (info instanceof Error) {
        if (info.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Expired token');
        } else if (info.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Invalid token');
        }
      }
      throw new UnauthorizedException('Unauthorized access');
    }

    return user;
  }
}
