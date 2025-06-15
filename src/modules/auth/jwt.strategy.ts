import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.authService.getById(payload.sub);
    if (!user) throw new UnauthorizedException();
    // Retorna apenas os campos que queremos disponibilizar em req.user
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
      document: user.document,
    };
  }
}
