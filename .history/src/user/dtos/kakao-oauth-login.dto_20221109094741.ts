import { ArgsType, Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { string } from "joi";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
@InputType()
export class KakaoOAuthInput{
    @Field((type) => String,{nullable:false})
    code:string;
}

@ObjectType()
export class KakaoOAuthOutput extends CoreOutput{
    @Field((type) => String,{nullable:true})
    token?:string;
}