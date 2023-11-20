import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENV_KEYS } from 'src/types/constant/env';
import { MailingModule } from 'src/mailing/mailing.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>(ENV_KEYS.JWT_SECRET),
          signOptions: {
            expiresIn: config.get<string | number>(ENV_KEYS.JWT_LIFETIME),
          },
        };
      },
    }),
    MailingModule,
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
