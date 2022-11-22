import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { NoticeService } from 'src/notice/notice.service';
import { User } from 'src/user/entities/user.entity';
import { Friends } from './entities/friends.entity';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
    imports: [TypeOrmModule.forFeature([Friends,User,Notice])],
    providers: [FriendsResolver, FriendsService,NoticeService],
    exports: [FriendsService]
})
export class FriendsModule {}
