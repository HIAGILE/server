import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Member } from "src/member/entities/member.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";


export enum ProjectCode {
    SCRUM = "SCRUM",
    EX = "EX",
    PAIR = "PAIR",
    KANBAN = "KANBAN",
}

registerEnumType(ProjectCode, { name: 'ProjectCode' })

@InputType('ProjectInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Project extends CoreEntity {

    @Column({ default: false })
    @Field((type) => ProjectCode)
    @IsEnum(ProjectCode)
    code: ProjectCode;

    @Column({ nullable: false })
    @Field((type) => String)
    @IsString()
    name: string;

    @Field((type) => User)
    @ManyToOne((type) => User, (user) => user.projects,{
        nullable:true,
        onDelete:"SET NULL",
        eager:true,
    })
    owner: User

    @RelationId((user: User) => user.projects)
    userId: number;

    @Column({ nullable: true })
    @Field((type) => String)
    gitURL: string;

    @Field((type) => [Sprint])
    @OneToMany(() => Sprint, (sprint) => sprint.project)
    sprints: [Sprint];


    @Field((type) => [Member])
    @OneToMany(() => Member, (member) => member.project)
    members: [Member];

}