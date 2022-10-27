import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sprint } from "./entities/sprint.entity";

@Injectable()

export class SprintService{
    constructor(
        @InjectRepository(Sprint)
        private readonly sprints:Repository<Sprint>,
    ){}

}
