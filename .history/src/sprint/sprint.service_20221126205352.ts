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
            }
        }
        catch(e){
            
        }
    }

    async createSprint(
        authUser:User,
        getSprintInput:CreateSprintInput
    ):Promise<CreateSprintOutput>{
        try{
            const project = await this.projects.findOne({
                where:{
                    id:getSprintInput.projectId,
                }
            });
            const sprint = await this.sprints.create({
                project:project,
                startDate:getSprintInput.startDate,
                endDate:getSprintInput.endDate,
                period:getSprintInput.period,
                purpose:getSprintInput.purpose,
            });

            await this.sprints.save(sprint);

            return {
                ok:true,
                error:null,
                sprintId:sprint.id,
            }
        }
        catch(e){

        }
    }
}