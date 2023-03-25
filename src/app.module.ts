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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'yayanjay123',
      password: 'yayanjay123',
      database: 'portfolio_db',
      entities: [Project, ProjectTag, ProjectRepo, ProjectImage],
      synchronize: true,
    }),
    MulterModule.register({
      dest: '../public/upload',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.developmet'],
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
