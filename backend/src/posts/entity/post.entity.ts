import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { PostStatus } from 'src/types/enum';
import { User } from 'src/users/entity/user.entity';
import { LocalFile } from 'src/files/entity/localFile.entity';
import { Tag } from 'src/tags/entity';

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

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'image_id', nullable: true })
  imageId: string;

  @OneToOne(() => LocalFile, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_id' })
  image: LocalFile;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'posts_tags' })
  public tags: Tag[];
}
