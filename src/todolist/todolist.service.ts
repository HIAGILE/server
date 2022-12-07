import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "src/member/entities/member.entity";
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
        private readonly toDoLists:Repository<ToDoList>,
        @InjectRepository(User)
        private readonly users:Repository<User>,
        @InjectRepository(Sprint)
        private readonly sprints:Repository<Sprint>,
        @InjectRepository(Member)
        private readonly members:Repository<Member>,
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
            const memeberIds = createToDoListInput.memberId.split(",").map((id)=>Number(id));
            const memberArray:Member[] = [];

            for(const memberId of memeberIds){
                const member = await this.members.findOne({
                    where:{
                        id:memberId,
                    }
                });
                if(member && member !== null){
                    memberArray.push(member)
                }
            }

            const sprint = await this.sprints.findOne({
                where:{
                    id:createToDoListInput.sprintId,
                }
            });


            const toDoList = await this.toDoLists.save(
                this.toDoLists.create({
                    title:createToDoListInput.title,
                    description:createToDoListInput.description,
                    status:createToDoListInput.status,
                    sprint:sprint,
                    members:memberArray,
                })
            );

            return {
                ok:true,
                error:null,
                toDoListId:toDoList.id
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
