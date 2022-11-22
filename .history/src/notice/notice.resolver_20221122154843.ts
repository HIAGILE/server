import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { NoticeMakerInput, NoticeMakerOutput } from "./dtos/follow-user.dto";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";

@Resolver((of)=>Notice)
export class NoticeResolver{
    constructor(private readonly noticeService:NoticeService){}

    @Mutation((returns) => NoticeMakerOutput)
    async noticeMaker(@Args('input') followUserInput: NoticeMakerInput): Promise<NoticeMakerOutput>{
        return await this.noticeService.noticeMaker(followUserInput);
    }
}