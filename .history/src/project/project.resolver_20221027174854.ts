import { Query, Resolver } from "@nestjs/graphql";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";

@Resolver((of)=>Project)
export class ProjectResolver{
    constructor(private readonly projectService:ProjectService){}
}