import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class superClass extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    dateCreated: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    dateUpdated: Date;
}
