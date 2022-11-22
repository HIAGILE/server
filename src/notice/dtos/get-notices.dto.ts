import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Notice } from "../entities/notice.entity";

@InputType()
export class GetNoticesInput {}

@ObjectType()
export class GetNoticesOutput extends CoreOutput {
    @Field((type) => [Notice], { nullable: true })
    notices?: Notice[];
}