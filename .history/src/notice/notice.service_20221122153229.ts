import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notice } from "./entities/notice.entity";

@Injectable()
export class NoticeService{
    constructor(
        @InjectRepository(Notice)
        private readonly notice:Repository<Notice>,
    ){}
}
