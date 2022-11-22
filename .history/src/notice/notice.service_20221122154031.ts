import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FollowUserOutput } from "./dtos/follow-user.dto";
import { Notice } from "./entities/notice.entity";

@Injectable()
export class NoticeService{
    constructor(
        @InjectRepository(Notice)
        private readonly notice:Repository<Notice>,
    ){}

    async followUser(userId:number,description:string):Promise<FollowUserOutput>{
        const notice = await this.notice.create({userId,description});
        await this.notice.save(notice);
        return {
            ok : true,
        }
    }
}
