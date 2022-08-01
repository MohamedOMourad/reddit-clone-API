import { Column, Entity, ManyToOne } from "typeorm";
import { Posts } from "./Posts";
import { superClass } from "./superClass";
import { Users } from "./Users";


@Entity()
export class Comments extends superClass {

    @Column()
    body: string;

    @ManyToOne(() => Users, (user) => user.comments, { nullable: false })
    user: Users;

    @ManyToOne(() => Posts, (post) => post.comments, { nullable: false })
    post: Posts;
}
