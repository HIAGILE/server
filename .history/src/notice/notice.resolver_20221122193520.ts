import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { GetNoticesOutput } from "./dtos/get-notices.dto";
import { NoticeMakerInput, NoticeMakerOutput } from "./dtos/notice-maker.dto";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";

@Resolver((of)=>Notice)
export class NoticeResolver{
    constructor(private readonly noticeService:NoticeService){}

    @Mutation((returns) => NoticeMakerOutput)
    async noticeMaker(@Args('input') followUserInput: NoticeMakerInput): Promise<NoticeMakerOutput>{
        return await this.noticeService.noticeMaker(followUserInput);
    }

    @Query((returns) => GetNoticesOutput)
    @Role(['Any'])
    async getNotices(
        @AuthUser() authUser,
    ): Promise<GetNoticesOutput> {
        return await this.noticeService.getNotices(authUser);
    }
}