import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepo } from './entities/project-repo.entity';
import { ProjectTag } from './entities/project-tag.entity';
import { Project } from './entities/project.entity';
import { S3 } from 'aws-sdk';
import { ProjectImage } from './entities/project-images.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(ProjectTag)
    private projectTagRepository: Repository<ProjectTag>,

    @InjectRepository(ProjectRepo)
    private projectRepoRepository: Repository<ProjectRepo>,

    @InjectRepository(ProjectImage)
    private projectImageRepository: Repository<ProjectImage>,

    private dataSource: DataSource,
  ) {}

  async addProject(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
  ) {
    const project = new Project();
    project.project_name = createProjectDto.name;
    project.project_desc = createProjectDto.desc;
    project.url_public = createProjectDto.url_public;
    await this.dataSource.manager.save(project);

    // looping for project tags
    for (let i = 0; i < createProjectDto.tag.length; i++) {
      const tag = new ProjectTag();
      tag.tag_name = createProjectDto.tag[i];
      tag.project = project;
      await this.dataSource.manager.save(tag);
    }

    // looping for project repository
    for (let i = 0; i < createProjectDto.url_repo.length; i++) {
      const repo = new ProjectRepo();
      repo.url_repository = createProjectDto.url_repo[i];
      repo.project = project;
      await this.dataSource.manager.save(repo);
    }

    const uploadedFile = await this.uploadFile(file.buffer, file.originalname);
    console.log('File has been uploaded,', uploadedFile.file_name);
    return HttpStatus.OK;
  }

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.ICH_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuidv4()}-${fileName}`,
      })
      .promise();

    const image = new ProjectImage();
    image.file_name = fileName;
    image.file_url = uploadResult.Location;
    image.key = uploadResult.Key;

    const filestored = await this.dataSource.manager.save(image);

    return filestored;
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
