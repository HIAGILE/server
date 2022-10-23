import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    import:[TypeOrmModule.forFeature([User])],
    providers:[UserResolver,UserService],
    exports:[UserService]
})
export class UserModule {

}
