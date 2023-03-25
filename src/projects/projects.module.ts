import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectTag } from './entities/project-tag.entity';
import { ProjectRepo } from './entities/project-repo.entity';
import { ProjectImage } from './entities/project-images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectTag, ProjectRepo, ProjectImage]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
