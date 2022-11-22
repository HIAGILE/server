import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Project } from "src/project/entities/project.entity";
import { ToDoList } from "src/todolist/entities/todolist.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";


@InputType('NoticeInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Notice extends CoreEntity{
    @Field((type) => User)
    @ManyToOne((type) => User, (user) => user.notice, {
        nullable: true,
        onDelete: "CASCADE",
        eager: true
    })
    user: User;

    @RelationId((notice: Notice) => notice.user)
    userId: number;

    @Column({ default: false ,nullable:false})
    @Field((type) => String)
    @IsString()
    description:string;
}