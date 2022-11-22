import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { NoticeService } from 'src/notice/notice.service';
import { Project } from './entities/project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';


@Module({
    imports: [TypeOrmModule.forFeature([Project,Notice])],
    providers: [ProjectResolver, ProjectService,NoticeService],
    exports: [ProjectService]
})
export class ProjectModule { }
