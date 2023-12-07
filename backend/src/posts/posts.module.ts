import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';

import { ENV_KEYS } from 'src/types/constant';
import { AuthModule } from 'src/auth/auth.module';
import { LocalFileModule } from 'src/files/localFiles.module';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entity/post.entity';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          socket: {
            host: config.get<string>(ENV_KEYS.REDIS_HOST) || 'localhost',
            port: +config.get<string>(ENV_KEYS.REDIS_PORT) || 6379,
          },
        };
      },
    }),
    AuthModule,
    LocalFileModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, CacheService],
})
export class PostsModule {}
