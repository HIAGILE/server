import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";

@InputType('MemberInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Member extends CoreEntity {
    
    @Field((type) => Project)
    @ManyToOne((type) => Project)
    project:Project;

    @RelationId((member:Member) => member.project)
    projectId:number;

    @Field((type) => Project)
    @OneToOne((type) => Project)

}