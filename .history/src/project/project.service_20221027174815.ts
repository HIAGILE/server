import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";

@Injectable()

export class ProjectService{
    constructor(
        @InjectRepository(Project)
        private readonly projects:Repository<Project>,
    ){}
}