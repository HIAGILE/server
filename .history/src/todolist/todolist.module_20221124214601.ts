import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { ToDoList } from './entities/todolist.entity';
import { ToDoListResolver } from './todolist.resolver';
import { ToDoListService } from './todolist.service';

@Module({
    imports: [TypeOrmModule.forFeature([ToDoList,Sprint])],
    providers: [ToDoListResolver, ToDoListService],
    exports: [ToDoListService]
})
export class TodolistModule {}
