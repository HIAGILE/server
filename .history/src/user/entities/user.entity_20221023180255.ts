import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

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

}


