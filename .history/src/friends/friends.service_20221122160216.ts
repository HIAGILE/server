import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoticeService } from "src/notice/notice.service";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { FollowUserInput, FollowUserOutput } from "./dtos/follow-user.dto";
import { Friends } from "./entities/friends.entity";

@Injectable()
export class FriendsService{
    constructor(
        @InjectRepository(Friends)
        private readonly friends:Repository<Friends>,
        @InjectRepository(User)
        private readonly users:Repository<User>,
        private readonly noticeService: NoticeService,
    ){}
    async followUser(authUser,{userId}:FollowUserInput):Promise<FollowUserOutput>{
        try{
            const user = await this.users.findOne({
                where:{
                    id:userId
                }}
            );
            const my = await this.noticeService.noticeMaker({
                userId:authUser.id,
                description:`${user.name}님을 팔로우 하였습니다.`
            })
            const you = await this.noticeService.noticeMaker({
                userId:userId,
                description:`${authUser.name}님이 회원님을 팔로우 하였습니다.`
            })
            if(my.ok && you.ok){
                return{
                    ok:true,
                }
            }
        }
        catch(e){
            return{
                ok : false,
                error:"내부 오류가 발생했습니다. 팔로우 신청이 실패했습니다."
            }
        }
    }
}
