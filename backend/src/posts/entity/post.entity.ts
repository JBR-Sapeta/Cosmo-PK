import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { PostStatus } from 'src/types/enum';
import { User } from 'src/users/entity/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column()
  title: string;

  @Column()
  lead: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
