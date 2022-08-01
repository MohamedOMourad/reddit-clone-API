import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Posts } from "./Posts";
import { superClass } from "./superClass";


@Entity()
export class Tags extends superClass {

    @Column()
    name: string;

    @ManyToMany(() => Posts)
    posts: Posts[];
}
