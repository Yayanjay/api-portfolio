// eslint-disable-next-line @typescript-eslint/no-var-requires
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Project } from './projects/entities/project.entity';
import { ProjectTag } from './projects/entities/project-tag.entity';
import { ProjectsModule } from './projects/projects.module';
import { ProjectRepo } from './projects/entities/project-repo.entity';
import { ProjectImage } from './projects/entities/project-images.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ProjectsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.developmet'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Project, ProjectTag, ProjectRepo, ProjectImage],
      synchronize: true,
    }),
    MulterModule.register({
      dest: '../public/upload',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
