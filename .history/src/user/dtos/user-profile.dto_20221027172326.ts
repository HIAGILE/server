import { ArgsType, Field } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput{
    @Field((type) => Number)
    userId:number;
}

export class UserProfileOutput extends CoreOutput{
    @Field((type) => User,{nullable:true})
    user:User;
}