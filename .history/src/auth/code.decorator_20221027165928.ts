import { SetMetadata } from "@nestjs/common";
import { ProjectCode } from "src/project/entities/project.entity";

export type AllowedCodes = keyof typeof ProjectCode | "None";

export const Codes = (codes:AllowedCodes[]) => SetMetadata('codes',codes);