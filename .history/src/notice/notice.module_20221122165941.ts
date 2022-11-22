import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Notice } from './entities/notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Notice,User])],
    providers: [NoticeResolver, NoticeService,UserService],
    exports: [NoticeService]
})
export class NoticeModule {}
