import { InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Entity } from "typeorm";

export enum UserRole{
    Master = "Master",
    Client = "Client",
}

registerEnumType(UserRole,{name:'UserRole'})

@InputType('UserInputType',{isAbstract:true})
@ObjectType()
@Entity()


