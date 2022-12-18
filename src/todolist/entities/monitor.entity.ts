import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsDate, IsEnum, IsNumber } from "class-validator";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Member } from "src/member/entities/member.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm";
import { ToDoList } from "./todolist.entity";


export enum MonitorStatus{
    TODO = 'TODO',
    INPROGRESS = 'INPROGRESS',
    DONE = 'DONE',
}

registerEnumType(MonitorStatus,{name:'MonitorStatus'})

@InputType('MonitorInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Monitor extends CoreEntity{
    
    @Column({nullable:false,default:0})
    @Field((type) => Number)
    @IsNumber()
    rate:number;
     
    @Field((type) => ToDoList,{nullable:true})
    @ManyToOne(()=> ToDoList, (toDoList) => toDoList.monitors,{
        nullable:true,
        onDelete:"CASCADE",
        eager:true,
    })
    toDoList:ToDoList;

    @RelationId((monitor:Monitor) => monitor.toDoList)
    toDoListId:number;

    @Column({nullable:false})
    @Field((type) => Number)
    memberId:number;

    @Column({nullable:false})
    @Field((type) => Number)
    userId:number;
}