import { Query, Resolver } from "@nestjs/graphql";
import { ToDoList } from "./entities/todolist.entity";
import { ToDoListService } from "./todolist.service";

@Resolver((of)=>ToDoList)
export class ToDoListResolver{
    constructor(private readonly toDoListService:ToDoListService){}
}