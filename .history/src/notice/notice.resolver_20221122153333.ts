import { Resolver } from "@nestjs/graphql";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";

@Resolver((of)=>Notice)
export class NoticeResolver{
    constructor(private readonly noticeService:NoticeService){}
}