import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectImage } from './project-images.entity';
import { ProjectRepo } from './project-repo.entity';
import { ProjectTag } from './project-tag.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_name: string;

  @Column()
  project_desc: string;
  
  @OneToMany(() => ProjectImage, (image) => image.project)
  image_path: string[];
  
  @OneToMany(() => ProjectTag, (tag) => tag.project)
  tags: ProjectTag[];
  
  @OneToMany(() => ProjectRepo, (repo) => repo.project)
  url_repo: ProjectRepo[];
  
  @Column()
  url_public: string;
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  
}
