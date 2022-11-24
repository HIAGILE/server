import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
            return {
                ok:true,
                error:null,
            }
        }
        catch(e){

        }
    }
}