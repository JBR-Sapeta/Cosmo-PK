import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { LocalFileModule } from 'src/files/localFiles.module';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule, LocalFileModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
