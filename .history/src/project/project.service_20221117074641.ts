import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateProjectInput, CreateProjectOutput } from "./dtos/create_project";
import { Project, ProjectCode } from "./entities/project.entity";

@Injectable()
export class ProjectService{
    constructor(
        @InjectRepository(Project)
        private readonly projects:Repository<Project>,
    ){}

    async createProject({name,githubURL,code}:CreateProjectInput,user:User):Promise<CreateProjectOutput>{
        console.log(user)
        try{
            let projectCode;
            if (code === "SCRUM"){
                projectCode = ProjectCode.SCRUM
            }
            else if (code === "EX"){
                projectCode = ProjectCode.EX
            }
            else if (code === "PAIR"){
                projectCode = ProjectCode.PAIR
            }
            else if (code === "KANBAN"){
                projectCode = ProjectCode.KANBAN
            }
            const project = this.projects.create({
                name:name,
                githubURL:githubURL,
                owner:user,
                code:projectCode
            })
            await this.projects.save(project);

            return {
                ok:true,
                error:null,
                projectId:project.id,
            }
        }
        catch (e){
            return {
                ok :false,
                error:"내부 오류가 발생했습니다. 프로젝트 생성에 실패했습니다."
            }
        }
    }
}