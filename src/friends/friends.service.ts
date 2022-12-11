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

    async acceptUser(authUser,{userId}:FollowUserInput):Promise<FollowUserOutput>{
        try{
            const user = await this.users.findOne({
                where:{
                    id:userId
                }}
            );

            const friend = await this.friends.findOne({
                where:{
                    user:{
                        id:authUser.id
                    },
                    friendId:userId
                }
            });
            friend.verified = true;
            await this.friends.save(friend);

            const my = await this.noticeService.noticeMaker({
                userId:authUser.id,
                description:`${user.name}님의 친구요청을 수락했습니다.`
            })
            const you = await this.noticeService.noticeMaker({
                userId:userId,
                description:`${authUser.name}님이 친구요청을 수락했습니다.`
            })

            const myFriends = await this.friends.find({
                where: {
                  user:{
                    id:authUser.id
                  },
                }
              });
            if(my.ok && you.ok){
                return {
                    ok:true,
                    error:null,
                    friends:myFriends
                }
            }else{
                return {
                    ok:false,
                    error:"알 수 없는 오류가 발생하였습니다."
                }
            }
        }catch(e){
            console.log(e);
            return {
                ok:false,
                error:"알 수 없는 오류가 발생하였습니다."
            };
        }
    }

    async unfollowUser(authUser,{userId}:FollowUserInput):Promise<FollowUserOutput>{
        try{
            const user = await this.users.findOne({
                where:{
                    id:userId
                }}
            );
            const friend1 = await this.friends.findOne({
                where:{
                    user:{
                        id:authUser.id
                    },
                    friendId:userId
                }
            });
            friend1.verified = false;
            await this.friends.save(friend1);
            const my = await this.noticeService.noticeMaker({
                userId:authUser.id,
                description:`${user.name}님을 언팔로우 하였습니다.`
            })
            const you = await this.noticeService.noticeMaker({
                userId:userId,
                description:`${authUser.name}님이 회원님을 언팔로우 하였습니다.`
            })

            const myFriends = await this.friends.find({
                where: {
                  user:{
                    id:authUser.id
                  },
                }
              });
            if(my.ok && you.ok){
                return {
                    ok:true,
                    error:null,
                    friends:myFriends
                }
            }else{
                return {
                    ok:false,
                    error:"알 수 없는 오류가 발생하였습니다."
                }
            }
        }catch(e){
            return {
                ok:false,
                error:"알 수 없는 오류가 발생하였습니다."
            }
        }
    }
    async followUser(authUser,{userId}:FollowUserInput):Promise<FollowUserOutput>{
        try{
            const user = await this.users.findOne({
                where:{
                    id:userId
                }}
            );
            const friend1 = await this.friends.findOne({
                where:{
                    user:{
                        id:authUser.id
                    },
                    friendId:userId
                }
            });
            if (friend1) {
                friend1.verified = true;
                await this.friends.save(friend1);
            }
            else{
                await this.friends.save(this.friends.create(
                    {
                        user:authUser,
                        friendId:userId,
                        verified:true,
                    }
                ));
                await this.friends.save(this.friends.create(
                    {
                        user:user,
                        friendId:authUser.id,
                        verified:false,
                    }
                ));
            }

            const my = await this.noticeService.noticeMaker({
                userId:authUser.id,
                description:`${user.name}님을 팔로우 하였습니다.`
            })
            const you = await this.noticeService.noticeMaker({
                userId:userId,
                description:`${authUser.name}님이 회원님을 팔로우 하였습니다.`
            })

            const myFriends = await this.friends.find({
                where: {
                  user:{
                    id:authUser.id
                  },
                }
            });

            if(my.ok && you.ok){
                return{
                    ok:true,
                    friends:myFriends
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
