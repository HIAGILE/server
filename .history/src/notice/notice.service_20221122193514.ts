import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { GetNoticesOutput } from "./dtos/get-notices.dto";
import { NoticeMakerInput, NoticeMakerOutput } from "./dtos/notice-maker.dto";
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

    async getNotices({id}:User):Promise<GetNoticesOutput>{ 
        try{
            const notices =  await this.notice.find(
                {
                    where:{
                        user:{
                            id:id
                        }
                    }
                }
            )
            if(!notices){
                return{
                    ok : false,
                    error:"공지사항이 존재하지 않습니다."
                }
            }
            return {
                ok : true,
                notices:notices
            }
        }
        catch(e){
            return{
                ok : false,
                error:"내부 오류가 발생했습니다. 공지사항을 불러오는데 실패했습니다."
            }
        }
    }
}
