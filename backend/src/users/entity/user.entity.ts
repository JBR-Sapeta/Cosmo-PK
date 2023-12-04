import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Post } from 'src/posts/entity/post.entity';
import { Role } from 'src/types/enum';
import { LocalFile } from 'src/files/entity/localFile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  roles: Role[];

  @Column({ nullable: true })
  @Exclude()
  activationToken: string;

  @Column({ nullable: true })
  @Exclude()
  resetToken: string;

  @Column({ nullable: true })
  @Exclude()
  resetTokenExpirationDate: Date;

  @Column({ default: false })
  isActive: boolean;

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

  @OneToMany(() => Post, (post) => post.user, { onDelete: 'SET NULL' })
  posts: Post[];
}
