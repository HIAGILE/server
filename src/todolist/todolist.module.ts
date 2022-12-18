import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { User } from 'src/user/entities/user.entity';
import { Monitor } from './entities/monitor.entity';
import { ToDoList } from './entities/todolist.entity';
import { ToDoListResolver } from './todolist.resolver';
import { ToDoListService } from './todolist.service';

@Module({
    imports: [TypeOrmModule.forFeature([ToDoList,Sprint,Member,User,Monitor])],
    providers: [ToDoListResolver, ToDoListService],
    exports: [ToDoListService]
})
export class TodolistModule {}
