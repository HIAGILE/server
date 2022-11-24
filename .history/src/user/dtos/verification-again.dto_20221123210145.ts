import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Verification } from "../entities/verification.entity";

@InputType()
export class VerificationAgainInput{}


@ObjectType()
export class VerificationAgainOutput extends CoreOutput{}