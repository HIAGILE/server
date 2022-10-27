import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";


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

    @Column({nullable:false})
    @Field((type) => String)
    title:string;

    @Column({nullable:true})
    @Field((type) => String)
    description:string;
    
    @Field((type) => Sprint,{nullable:true})
    @ManyToOne(()=> Sprint, (sprint) => sprint.toDoList)
    sprint:Sprint;

    @RelationId((toDoList:ToDoList) => toDoList.sprint)
    sprintId:number;
}