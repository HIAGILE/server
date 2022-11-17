import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { IsBoolean, IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";

@InputType('FriendsInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Friends extends CoreEntity {

    @Field((type) => User)
    @ManyToOne((type) => User, (user) => user.friends, {
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

    @Column({ nullable: true })
    @Field((type) => Number)
    @IsNumber()
    friendId:number;
}


