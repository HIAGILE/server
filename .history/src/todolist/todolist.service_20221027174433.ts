import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ToDoList } from "./entities/todolist.entity";

@Injectable()

export class ToDoListService{
    constructor(
        @InjectRepository(ToDoList)
        private readonly users:Repository<ToDoList>,
    ){}
}