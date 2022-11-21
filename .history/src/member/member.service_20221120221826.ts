import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AddMembersInput, AddMembersOutput } from "./dtos/add-members.dto";
import { Member, ProjectRole } from "./entities/member.entity";

@Injectable()
export class MemberService{
    constructor(
        @InjectRepository(User)
        private readonly users:Repository<User>,
        @InjectRepository(Member)
        private readonly members:Repository<Member>,
        @InjectRepository(Project)
        private readonly projects:Repository<Project>,
    ){}

    async addMembers({id}:User, {projectId,members}:AddMembersInput):Promise<AddMembersOutput>{
        const pm = await this.projects.findOne({
            where:{
                id:projectId,
                owner:{
                    id:id
                }
            }
        })
        if (!pm){
            return {
                ok:false,
                error:"프로젝트를 찾을 수 없습니다."
            }
        }
        members.map(async (member)=>{
            const user = await this.users.findOne({
                where:{
                    id:member.userId
                }
            })

            this.members.save(
                this.members.create({
                    project:pm,
                    user:user,
                    role:member.role == "Leader" ? ProjectRole.Leader : ProjectRole.member 
                })
            )
        })

        return {
            ok:true,
        }
    }
}
