import { BaseEntity, Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Posts } from "./Posts";
import { Users } from "./Users";

@Entity()
@Check(`"value" = 1 or "value" = -1`)
export class Votes extends BaseEntity {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    postId: number;

    @Column()
    value: number;

    @ManyToOne(() => Users, (user) => user.votes, { nullable: false })
    user: Users;

    @ManyToOne(() => Posts, (post) => post.votes, { nullable: false })
    post: Posts;
}
