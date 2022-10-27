import { ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Entity } from "typeorm";

@ObjectType()
@Entity()
export class Member extends CoreEntity{


}