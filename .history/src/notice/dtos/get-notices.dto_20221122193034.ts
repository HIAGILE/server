import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Notice } from "../entities/notice.entity";

@InputType()
export class NoticeMakerInput {}

@ObjectType()
export class NoticeMakerOutput extends CoreOutput {
    @Field((type) => [Notice], { nullable: true })
    notices?: Notice[];
}