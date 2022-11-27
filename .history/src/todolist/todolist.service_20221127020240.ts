import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        getToDoListInput:CreateToDoListInput
    ):Promise<CreateToDoListOutput>{
        try{

            console.log("hello")
            return {
                ok:true,
                error:null,
                toDoListId:1
            }
        }
        catch(e){

        }
    }
}
