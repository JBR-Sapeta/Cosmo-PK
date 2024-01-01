import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'local_files' })
export class LocalFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  filename: string;

  @Column()
  @Exclude()
  path: string;

  @Column()
  @Exclude()
  mimetype: string;

  @Column()
  url: string;

  @Column()
  alt: string;
}
