import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Notice } from './entities/notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Notice,User])],
    providers: [NoticeResolver, NoticeService],
    exports: [NoticeService]
})
export class NoticeModule {}
