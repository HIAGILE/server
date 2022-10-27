import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { SprintResolver } from './sprint.resolver';
import { SprintService } from './sprint.service';

@Module({
    imports:[TypeOrmModule.forFeature([Sprint])],
    providers:[SprintResolver,SprintService],
    exports:[SprintService]
})
export class SprintModule {}
