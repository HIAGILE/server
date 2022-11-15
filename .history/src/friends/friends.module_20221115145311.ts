import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './entities/friends.entity';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
    imports: [TypeOrmModule.forFeature([Friends])],
    providers: [FriendsResolver, FriendsService],
    exports: [FriendsService]
})
export class FriendsModule {}
