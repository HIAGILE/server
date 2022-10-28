import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";

@InputType('MemberInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Member extends CoreEntity {
    
    @Field((type) => Project)
    @ManyToOne((type) => Project,(project) => project.members,{
        nullable:true,
        onDelete:"CASCADE",
        eager:true,
    })
    project:Project;

    @RelationId((member:Member) => member.project)
    projectId:number;

    @Field((type) => User)
    @ManyToOne((type) => User,(user) => user.members,{
        nullable:true,
        onDelete:"CASCADE",
        eager:true
    })
    user:User;

    @RelationId((member:Member) => member.user)
    userId:number;
}