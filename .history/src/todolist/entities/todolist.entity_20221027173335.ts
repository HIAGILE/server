import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


export enum ToDoListStatus{
    TODO = 'TODO',
    INPROGRESS = 'INPROGRESS',
    DONE = 'DONE',
}

@InputType('ToDoListInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class ToDoList extends CoreEntity{
    @Column({nullable:true})
    @Field((type) => Statur)
}