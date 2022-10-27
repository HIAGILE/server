import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


export enum ToDoListStatus{
    TODO = 'TODO',
    INPROGRESS = 'INPROGRESS',
    DONE = 'DONE',
}

registerEnumType(ToDoListStatus,{name:'ToDoListStatus'})

@InputType('ToDoListInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class ToDoList extends CoreEntity{
    
    @Column({type:'enum',enum:ToDoListStatus})
    @Field((type) => ToDoListStatus)
    @IsEnum(ToDoListStatus)
    status:ToDoListStatus;
}