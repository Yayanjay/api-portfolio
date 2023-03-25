import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag_name: string;

  @ManyToOne(() => Project, (project) => project.tags)
  project: Project;
}
