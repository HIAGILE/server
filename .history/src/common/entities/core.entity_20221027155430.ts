import { Field, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class CoreEntity{
    @PrimaryGeneratedColumn()
    @Field((type) => Number)
    id:number;
}