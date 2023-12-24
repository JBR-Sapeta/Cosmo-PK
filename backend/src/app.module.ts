import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { MailingModule } from './mailing/mailing.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { LocalFileModule } from './files/localFiles.module';
import { ENV_KEYS } from './types/constant/env.const';

import { exceptionFactory } from './error';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>(ENV_KEYS.DB_HOST),
          port: +config.get<string>(ENV_KEYS.DB_PORT),
          username: config.get<string>(ENV_KEYS.DB_USER),
          password: config.get<string>(ENV_KEYS.DB_PASSWORD),
          database: config.get<string>(ENV_KEYS.DB_NAME),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    LocalFileModule,
    MailingModule,
    TagsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        exceptionFactory,
      }),
    },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
