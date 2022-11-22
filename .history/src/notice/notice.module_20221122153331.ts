import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Notice])],
    providers: [NoticeResolver, NoticeService],
    exports: [NoticeService]
})
export class NoticeModule {}
