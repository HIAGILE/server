import { Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";




@Entity()
export class Project extends CoreEntity{

    @Column({nullable:false})
    @Field((type)=>String)
    @IsString()
    code:string;

    @Column({nullable:false})
    @Field((type)=>String)
    @IsString()
    name:string;

    @Column({nullable:false})
    @Field((type)=>String)
    @ManyToOne((type)=>User,(user)=>user.projects)
    owner:User

    @RelationId((user:User) => user.projects)
    userId:number;
}