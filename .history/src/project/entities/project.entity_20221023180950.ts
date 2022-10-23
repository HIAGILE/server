import { Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class Project extends CoreEntity{

    @Column({nullable:false})
    @Field((type)=>String)
    @IsString()
    code:string;
}