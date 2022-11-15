import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateProjectInput, CreateProjectOutput } from "./dtos/create_project";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";

@Resolver((of)=>Project)
export class ProjectResolver{
    constructor(private readonly projectService:ProjectService){}

    @Mutation((returns) => CreateProjectOutput)
    async createAccount(@AuthUser() authUser: User, @Args('input') createProjectInput: CreateProjectInput): Promise<CreateProjectOutput>{
        return await this.projectService.createProject(createProjectInput,authUser);
    }
}