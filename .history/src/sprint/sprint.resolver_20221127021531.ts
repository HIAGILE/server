import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateSprintInput, CreateSprintOutput } from "./dtos/create-sprint.dto";
import { GetSprintInput, GetSprintOutput } from "./dtos/get-sprint.dto";
import { GetSprintsInput, GetSprintsOutput } from "./dtos/get-sprints.dto";
import { Sprint } from "./entities/sprint.entity";
import { SprintService } from "./sprint.service";

@Resolver((of)=>Sprint)
export class SprintResolver{
    constructor(private readonly sprintService:SprintService){}

    @Mutation((returns)=>CreateSprintOutput)
    @Role(['Any'])
    async createSprint(
        @AuthUser() authUser:User,
        @Args('input') createSprintInput:CreateSprintInput
    ):Promise<CreateSprintOutput>{
        return await this.sprintService.createSprint(authUser,createSprintInput);
    }

    @Query((returns)=>GetSprintsOutput)
    @Role(['Any'])
    async getSprints(
        @AuthUser() authUser:User,
        @Args('input') getSprintsInput:GetSprintsInput 
    ):Promise<GetSprintsOutput>{
        return await this.sprintService.getSprints(authUser,getSprintsInput);
    }

    @Query((returns)=>GetSprintOutput)
    @Role(['Any'])
    async getSprint(
        @AuthUser() authUser:User,
        @Args('input') getSprintInput:GetSprintInput
    ):Promise<GetSprintOutput>{
        return await this.sprintService.getSprint(authUser,getSprintInput);
    }
}