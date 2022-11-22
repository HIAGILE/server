import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Notice } from "../entities/notice.entity";

@InputType()
export class NoticeMakerInput {
    @Field((type) => Number)
    userId: number;

    @Field((type) => String)
    description: string;
}

@ObjectType()
export class NoticeMakerOutput extends CoreOutput {}