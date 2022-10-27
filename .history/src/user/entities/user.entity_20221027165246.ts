import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { IsBoolean, IsEnum } from "class-validator";
import { Project } from "src/project/entities/project.entity";
import { Member } from "src/member/entities/member.entity";

export enum UserRole{
    Master = "Master",
    Client = "Client",
}

registerEnumType(UserRole,{name:'UserRole'})

@InputType('UserInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column({nullable:true})
    @Field((type)=>String)
    name:string;

    @Column({unique:true,nullable:false})
    @Field((type)=>String)
    email:string;

    @Column({nullable:false})
    @Field((type)=>String)
    password:string;

    @Column({default:false})
    @Field((type)=>UserRole)
    @IsEnum(UserRole)
    role:UserRole;

    @Column({default:false})
    @Field((type)=>Boolean)
    @IsBoolean()
    verified:boolean;
    
    @Field((type) => [Project])
    @OneToMany((type) => Project,(project)=>project.owner,)
    projects:Project[]

    @Field((type) => [Member])
    @OneToMany((type) => Member,(member)=>member.user,)
    Members:Member[]
}


