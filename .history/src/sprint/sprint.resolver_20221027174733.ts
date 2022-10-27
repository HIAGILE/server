import { Resolver } from "@nestjs/graphql";
import { Sprint } from "./entities/sprint.entity";
import { SprintService } from "./sprint.service";

@Resolver((of)=>Sprint)
export class SprintResolver{
    constructor(private readonly sprintService:SprintService){}
}