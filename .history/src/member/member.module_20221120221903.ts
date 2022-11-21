import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Member } from './entities/member.entity';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
    imports: [TypeOrmModule.forFeature([Member,Project,User])],
    providers: [MemberResolver, MemberService],
    exports: [MemberService]
})
export class MemberModule {}
