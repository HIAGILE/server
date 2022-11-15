import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm";
import { IsBoolean, IsEnum } from "class-validator";
import { Project } from "src/project/entities/project.entity";
import { Member } from "src/member/entities/member.entity";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";

@InputType('FriendsInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Friends extends CoreEntity {

    @Field((type) => User)
    @ManyToOne((type) => User, (user) => user.friend, {
        nullable: true,
        onDelete: "CASCADE",
        eager: true
    })
    user: User;

    @RelationId((friends: Friends) => friends.user)
    userId: number;

    @Column({ default: false })
    @Field((type) => Boolean)
    @IsBoolean()
    verified:boolean;

}


