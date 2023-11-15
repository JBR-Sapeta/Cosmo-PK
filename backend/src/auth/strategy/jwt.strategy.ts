import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENV_KEYS } from '../../constant/env';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(ENV_KEYS.JWT_SECRET),
    });
  }

  async validate(payload) {
    const { userId } = payload;
    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('Sign in to access this resource.');
    }

    return user;
  }
}
