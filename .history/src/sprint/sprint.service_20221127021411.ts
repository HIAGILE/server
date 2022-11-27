import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateSprintInput, CreateSprintOutput } from "./dtos/create-sprint.dto";
import { GetSprintInput, GetSprintOutput } from "./dtos/get-sprint.dto";
import { GetSprintsInput, GetSprintsOutput } from "./dtos/get-sprints.dto";
import { Sprint } from "./entities/sprint.entity";

@Injectable()
export class SprintService{
    constructor(
        @InjectRepository(Sprint)
        private readonly sprints:Repository<Sprint>,
        @InjectRepository(Project)
        private readonly projects:Repository<Project>,
    ){}

    async getSprint(
        authUser:User,
        getSprintInput:GetSprintInput
    ):Promise<GetSprintOutput>{
        try{
            const sprint = await this.sprints.findOne({
                where:{
                    id:getSprintInput.id,
                    project:{
                        id:getSprintInput.projectId,
                    }
                },
                relations:['project'],
            });

            return {
                ok:true,
                error:null,
            }
        }
        catch(e){

        }
    }

    async getSprints(
        authUser:User,
        getSprintsInput:GetSprintsInput
    ):Promise<GetSprintsOutput>{
        try{
            const sprints = await this.sprints.find({
                where:{
                    project:{
                        id:getSprintsInput.id,
                    }
                },
                relations:['project'],
            });


            return {
                ok:true,
                error:null,
                sprints:sprints,
            }
        }
        catch(e){
            
        }
    }

    async createSprint(
        authUser:User,
        createSprintInput:CreateSprintInput
    ):Promise<CreateSprintOutput>{
        try{
            console.log("hello")

            const project = await this.projects.findOne({
                where:{
                    id:createSprintInput.projectId,
                },
                relations:['sprints'],
            });
            const sprint = this.sprints.create({
                project:project,
                startDate:createSprintInput.startDate,
                endDate:createSprintInput.endDate,
                period:createSprintInput.period,
                purpose:createSprintInput.purpose,
            });

            await this.sprints.save(sprint);

            return {
                ok:true,
                error:null,
                sprintId:sprint.id,
            }
        }
        catch(e){
            return{
                ok:false,
                error:e,
                sprintId:null,
            }
        }
    }
}