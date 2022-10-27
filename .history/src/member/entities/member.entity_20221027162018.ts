import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Entity } from "typeorm";

@InputType('MemberInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Member extends CoreEntity {
    @Field((type) => Number)

}