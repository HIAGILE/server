import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Sprint } from './entities/sprint.entity';
import { SprintResolver } from './sprint.resolver';
import { SprintService } from './sprint.service';

@Module({
    imports:[TypeOrmModule.forFeature([Sprint,Project])],
    providers:[SprintResolver,SprintService],
    exports:[SprintService]
})
export class SprintModule {}
