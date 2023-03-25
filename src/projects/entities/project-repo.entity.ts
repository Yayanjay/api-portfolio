import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectRepo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url_repository: string;

  @ManyToOne(() => Project, (project) => project.url_repo)
  project: Project;
}
