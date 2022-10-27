import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";


export enum ProjectCode{
    SCRUM = "SCRUM",
    EX = "EX",
    PAIR = "PAIR",
    KANBAN = "KANBAN",
}

@InputType('ProjectInputType')
@ObjectType()
@Entity()
export class Project extends CoreEntity{

    @Column({default:false})
    @Field((type)=>ProjectCode)
    @IsEnum(ProjectCode)
    code:ProjectCode;

    @Column({nullable:false})
    @Field((type)=>String)
    @IsString()
    name:string;

    @Column({nullable:false})
    @Field((type)=>String)
    @ManyToOne((type)=>User,(user)=>user.projects)
    owner:User

    @RelationId((user:User) => user.projects)
    userId:number;

    @Column({nullable:true})
    @Field((type)=>String)
    gitURL:string;
}