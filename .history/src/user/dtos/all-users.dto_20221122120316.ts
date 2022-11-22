import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class AllUsersInput {}

@ObjectType()
export class AllUsersOutput extends CoreOutput {
    @Field((type) =>[User], { nullable: true })
    Users?: User[];
}