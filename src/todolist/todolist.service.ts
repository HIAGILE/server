import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "src/member/entities/member.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateToDoListInput, CreateToDoListOutput } from "./dtos/create-todolist.dto";
import { GetToDoListInput, GetToDoListOutput } from "./dtos/get-todolist.dto";
import { GetToDoListsInput, GetToDoListsOutput } from "./dtos/get-todolists.dto";
import { UpdateMonitorInput, UpdateMonitorOutput } from "./dtos/update-monitor";
import { UpdateToDoListInput, UpdateToDoListOutput } from "./dtos/update-todolist.dto";
import { Monitor } from "./entities/monitor.entity";
import { ToDoList, ToDoListStatus } from "./entities/todolist.entity";

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
        @InjectRepository(Monitor)
        private readonly monitors:Repository<Monitor>,
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
                    },
                    relations:["user"]
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
                    startDate:createToDoListInput.startDate,
                    endDate:createToDoListInput.endDate,
                    status:createToDoListInput.status,
                    sprint:sprint,
                    members:memberArray,
                })
            );

            for(const member of memberArray){
                await this.monitors.save(
                    this.monitors.create({
                        memberId:member.id,
                        toDoList:toDoList,
                        userId:member.user.id
                    })
                )
            }

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

    async updateToDoList(
        authUser:User,
        updateToDoListInput:UpdateToDoListInput
    ):Promise<UpdateToDoListOutput>{
        try{
            const toDoList = await this.toDoLists.findOne({
                where:{
                    id:updateToDoListInput.id,
                }
            });


            return {
                ok:true,
                error:null,
            }
        }
        catch(e){

        }
    }

    async updateMonitor(
        authUser:User,
        updateMonitorInput:UpdateMonitorInput
    ):Promise<UpdateMonitorOutput>{
        try{
            const todolist = await this.toDoLists.findOne({
                where:{
                    id:updateMonitorInput.id
                }
            })
            const monitor = await this.monitors.findOne({
                where:{
                    toDoList:{
                        id:todolist.id
                    },
                    memberId:updateMonitorInput.memberId
                }
            })
            monitor.rate = updateMonitorInput.rate
            await this.monitors.save(monitor);

            const monitors = await this.monitors.find({
                where:{
                    toDoList:{
                        id:todolist.id
                    }
                }
            })
            let total = 0
            for(const monitor of monitors){
                total+=monitor.rate
            }
            if (total > 0){
                todolist.status = ToDoListStatus.INPROGRESS
            }
            if (total == monitors.length * 100){
                todolist.status = ToDoListStatus.DONE
            }

            await this.toDoLists.save(todolist)
            return {
                ok:true,
                error:null
            }
        }catch(e){
            return {
                ok:false,
                error:e
            }
        }
    }
}
