import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoticeService } from "src/notice/notice.service";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateProjectInput, CreateProjectOutput } from "./dtos/create-project.dto";
import { GetProjectInput, GetProjectOutput } from "./dtos/get-project.dto";
import { GetProjectsOutput } from "./dtos/get-projects.dto";
import { Project, ProjectCode } from "./entities/project.entity";

@Injectable()
export class ProjectService{
    constructor(
        @InjectRepository(Project)
        private readonly projects:Repository<Project>,
        private readonly noticeService:NoticeService
    ){}

    async createProject({name,githubURL,code}:CreateProjectInput,user:User):Promise<CreateProjectOutput>{
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

            await this.noticeService.noticeMaker({
                userId:user.id,
                description:"프로젝트가 생성되었습니다."
            })            

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

    async getProjects(user:User):Promise<GetProjectsOutput>{
        try{
            const projects = await this.projects.find({
                where:{
                    owner:{
                        id:user.id
                    }
                }
                ,relations:["owner","members","members.user","sprints","sprints.toDoList"]
            })
            return {
                ok:true,
                error:null,
                projects:projects
            }
        }
        catch (e){
            return {
                ok:false,
                error:"내부 오류가 발생했습니다. 프로젝트 조회에 실패했습니다."
            }
        }
    }
    async getProject(user:User,getProjectInput:GetProjectInput):Promise<GetProjectOutput>{
        try{
            const project = await this.projects.findOne({
                where:{
                    id:getProjectInput.id,
                    owner:{
                        id:user.id
                    }
                }
                ,relations:["owner","members","members.user","sprints","sprints.toDoList"]
            })
            return {
                ok:true,
                error:null,
                project:project
            }
        }
        catch (e){
            return {
                ok:false,
                error:"내부 오류가 발생했습니다. 프로젝트 조회에 실패했습니다."
            }
        }
    }
}