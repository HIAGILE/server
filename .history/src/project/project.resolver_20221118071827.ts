import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateProjectInput, CreateProjectOutput } from "./dtos/create_project";
import { GetProjectsInput, GetProjectsOutput } from "./dtos/get-projects";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";

@Resolver((of) => Project)
export class ProjectResolver {
    constructor(private readonly projectService: ProjectService) { }

    @Mutation((returns) => CreateProjectOutput)
    @Role(['Client'])
    async createProject(@AuthUser() authUser: User, @Args('input') createProjectInput: CreateProjectInput): Promise<CreateProjectOutput> {
        return await this.projectService.createProject(createProjectInput, authUser);
    }

    @Query((returns) => GetProjectOutput)
    @Role(['Any'])
    async getProjects(@AuthUser() authUser: User, @Args('input') getProjectsInput: GetProjectsInput): Promise<GetProjectsOutput> {
        return await this.projectService.getProjects(authUser);
    }
    // @Mutation((returns) => CreateProjectOutput)
    // async addMembers(@AuthUser() AuthUser:User, @Args('input'))
}