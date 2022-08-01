import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Comments } from "./Comments";
import { superClass } from "./superClass";
import { Votes } from "./Votes";
import { Tags } from "./tags";

@Entity()
export class Posts extends superClass {

    @Column()
    title: string;

    @Column({ nullable: true })
    body: string;

    @ManyToOne(() => Users, (user) => user.post, { nullable: false })
    user: Users;

    @OneToMany(() => Comments, (comments) => comments.post)
    comments: Comments[];

    @OneToMany(() => Votes, (votes) => votes.post)
    votes: Votes[];

    @ManyToMany(() => Tags)
    @JoinTable()
    tags: Tags[];
}
