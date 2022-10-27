import { InputType, ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";


@InputType('SprintInputType',{isAbstract:true})
@ObjectType()
@Entity()
