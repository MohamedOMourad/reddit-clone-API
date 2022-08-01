import { Column, Entity, OneToMany, } from "typeorm";
import { Posts } from "./Posts";
import { Comments } from "./Comments";
import { superClass } from "./superClass";
import { Votes } from "./Votes";

@Entity()
export class Users extends superClass {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    Email: string;

    @Column({ nullable: true })
    imgUrl: string;

    @OneToMany(() => Posts, (post) => post.user)
    post: Posts[];

    @OneToMany(() => Comments, (comments) => comments.user)
    comments: Comments[];

    @OneToMany(() => Votes, (votes) => votes.user)
    votes: Votes[]
}