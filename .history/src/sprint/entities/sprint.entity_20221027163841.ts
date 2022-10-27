import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


@InputType('SprintInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Sprint extends CoreEntity{
    @Column({nullable:false})
    @Field((type) => Date)
    @IsDate()
    startDate:Date;

    @Column({nullable:false})
    @Field((type) => Date)
    @IsDate()
    endDate:Date;

    @Column({nullable:false})
    @Field((type) => Int)
    @IsNumber()
    period:number;

    @Column({nullable:false})
    @Field((type) => String)
    @IsString()
    purpose:stringl
}