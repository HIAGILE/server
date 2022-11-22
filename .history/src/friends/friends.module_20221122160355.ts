import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { User } from 'src/user/entities/user.entity';
import { Friends } from './entities/friends.entity';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
    imports: [TypeOrmModule.forFeature([Friends,User,Notice])],
    providers: [FriendsResolver, FriendsService,],
    exports: [FriendsService]
})
export class FriendsModule {}
