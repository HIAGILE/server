import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateToDoListInput, CreateToDoListOutput } from "./dtos/create-todolist.dto";
import { GetToDoListInput, GetToDoListOutput } from "./dtos/get-todolist.dto";
import { GetToDoListsInput, GetToDoListsOutput } from "./dtos/get-todolists.dto";
import { UpdateMonitorInput, UpdateMonitorOutput } from "./dtos/update-monitor";
import { UpdateToDoListInput, UpdateToDoListOutput } from "./dtos/update-todolist.dto";
import { ToDoList } from "./entities/todolist.entity";
import { ToDoListService } from "./todolist.service";

@Resolver((of)=>ToDoList)
export class ToDoListResolver{
    constructor(private readonly toDoListService:ToDoListService){}

    @Mutation((returns)=>CreateToDoListOutput)
    @Role(['Any'])
    async createToDoList(
        @AuthUser() authUser:User,
        @Args('input') createToDoListInput:CreateToDoListInput
    ):Promise<CreateToDoListOutput>{
        return await this.toDoListService.createToDoList(authUser,createToDoListInput);
    }

    @Query((returns)=>GetToDoListsOutput)
    @Role(['Any'])
    async getToDoLists(
        @AuthUser() authUser:User,
        @Args('input') getToDoListsInput:GetToDoListsInput 
    ):Promise<GetToDoListsOutput>{
        return await this.toDoListService.getToDoLists(authUser,getToDoListsInput);
    }

    @Query((returns)=>GetToDoListOutput)
    @Role(['Any'])
    async getToDoList(
        @AuthUser() authUser:User,
        @Args('input') getToDoListInput:GetToDoListInput
    ):Promise<GetToDoListOutput>{
        return await this.toDoListService.getToDoList(authUser,getToDoListInput);
    }

    @Mutation((returns)=> UpdateToDoListOutput)
    @Role(['Any'])
    async updateToDoList(
        @AuthUser() authUser:User,
        @Args('input') updateToDoListInput:UpdateToDoListInput
    ):Promise<UpdateToDoListOutput>{
        return await this.toDoListService.updateToDoList(authUser,updateToDoListInput);
    }

    @Mutation((returns) => UpdateMonitorOutput)
    @Role(['Any'])
    async updateMonitor(
        @AuthUser() authUser:User,
        @Args('input') updateMonitorInput:UpdateMonitorInput
    ):Promise<UpdateMonitorOutput>{
        return await this.toDoListService.updateMonitor(authUser,updateMonitorInput);
    }
}