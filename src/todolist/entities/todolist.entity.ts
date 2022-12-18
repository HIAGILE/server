import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsDate, IsEnum } from "class-validator";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Member } from "src/member/entities/member.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Monitor } from "./monitor.entity";


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

    @Column({nullable:true})
    @Field((type) => Date)
    @IsDate()
    startDate:Date; 

    @Column({nullable:true})
    @Field((type) => Date)
    @IsDate()
    endDate:Date;

    @Field((type) => [Monitor],{nullable:false})
    @OneToMany(() => Monitor,(monitor) => monitor.toDoList)
    monitors?:Monitor[];
     
    @Field((type) => Sprint,{nullable:true})
    @ManyToOne(()=> Sprint, (sprint) => sprint.toDoList,{
        nullable:true,
        onDelete:"CASCADE",
        eager:true,
    })
    sprint:Sprint;

    @RelationId((toDoList:ToDoList) => toDoList.sprint)
    sprintId:number;

    @Field((type) => [Member],{nullable:true})
    @ManyToMany((type) => Member,{
        eager:true,
    })
    @JoinTable()
    members:Member[];
}