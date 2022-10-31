import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password', 'name', 'role']) { }

@InputType()
export class ValidateAccountInput extends PickType(User, ['email']) { }

@ObjectType()
export class CreateAccountOutput extends CoreOutput{}