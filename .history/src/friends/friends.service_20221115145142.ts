import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Friends } from "./entities/friends.entity";

@Injectable()
export class FriendsService{
    constructor(
        @InjectRepository(Friends)
        private readonly friends:Repository<Friends>,
    ){}
}
