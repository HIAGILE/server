import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { NoticeMakerInput, NoticeMakerOutput } from "./dtos/follow-user.dto";
import { Notice } from "./entities/notice.entity";

@Injectable()
export class NoticeService{
    constructor(
        @InjectRepository(Notice)
        private readonly notice:Repository<Notice>,
        @InjectRepository(User)
        private readonly users:Repository<User>,
    ){}

    async noticeMaker({userId,description}:NoticeMakerInput):Promise<NoticeMakerOutput>{
        try{
            const user = await this.users.findOne({
                where:{
                    id:userId
                }}
            );
            const notice = await this.notice.create(
                {
                    description:description,
                    user:user
                }
            );
            await this.notice.save(notice);
            return {
                ok : true,
            }
        }
        catch(e){
            return{
                ok : false,
                error:"내부 오류가 발생했습니다. 공지사항 생성에 실패했습니다."
            }
        }
    }
}
