import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, RelationId } from "typeorm";
import { IsBoolean, IsEnum } from "class-validator";
import { Project } from "src/project/entities/project.entity";
import { Member } from "src/member/entities/member.entity";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Friends } from "src/friends/entities/friends.entity";
import { Notice } from "src/notice/entities/notice.entity";

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
    name?:string;

    @Column({unique:true,nullable:false})
    @Field((type)=>String)
    email:string;

    @Column({nullable:true})
    @Field((type)=>String)
    password?:string;

    @Column({default:false})
    @Field((type)=>UserRole)
    @IsEnum(UserRole)
    role:UserRole;

    @Column({default:false})
    @Field((type)=>Boolean)
    @IsBoolean()
    verified:boolean;

    @Column({nullable:true,default:"https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/2bf0598d-f577-497f-4c11-033d1754ee00/public"})
    @Field((type)=>String)
    profileUrl:string;
    
    @Field((type) => [Project])
    @OneToMany((type) => Project,(project)=>project.owner,)
    projects:Project[]

    @Field((type) => [Member])
    @OneToMany((type) => Member,(member)=>member.user,)
    members:Member[]

    @Field((type) => [Friends])
    @OneToMany((type) => Friends,(friends)=>friends.user,)
    friends:Friends[]

    @Field((type) => [Notice])
    @OneToMany((type) => Notice,(notice)=>notice.user,)
    notice:Notice[]

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (this.password) {
            console.log(this.password);
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (e) {
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            console.log(aPassword,this.password)
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}


