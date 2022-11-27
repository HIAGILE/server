import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateToDoListInput, CreateToDoListOutput } from "./dtos/create-todolist.dto";
import { GetToDoListInput, GetToDoListOutput } from "./dtos/get-todolist.dto";
import { GetToDoListsInput, GetToDoListsOutput } from "./dtos/get-todolists.dto";
import { ToDoList } from "./entities/todolist.entity";

@Injectable()

export class ToDoListService{
    constructor(
        @InjectRepository(ToDoList)
        private readonly users:Repository<ToDoList>,
        @InjectRepository(Sprint)
        private readonly sprints:Repository<Sprint>,
    ){}

    async getToDoList(
        authUser:User,
        getToDoListInput:GetToDoListInput
    ):Promise<GetToDoListOutput>{
        try{
            return {
                ok:true,
                error:null,
            }
        }
        catch(e){

        }
    }

    async getToDoLists(
        authUser:User,
        getToDoListsInput:GetToDoListsInput
    ):Promise<GetToDoListsOutput>{
        try{
            return {
                ok:true,
                error:null,
            }
        }
        catch(e){
            
        }
    }

    async createToDoList(
        authUser:User,
        createToDoListInput:CreateToDoListInput
    ):Promise<CreateToDoListOutput>{
        try{
            const sprint = await this.sprints.findOne(createToDoListInput.sprintId);

            return {
                ok:true,
                error:null,
                toDoListId:1
            }
        }
        catch(e){
            return {
                ok:false,
                error:e,
                toDoListId:null
            }
        }
    }
}
