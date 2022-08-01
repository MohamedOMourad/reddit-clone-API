import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Users } from "../Entities/Users";
import { Posts } from "../Entities/Posts";
import { Comments } from "../Entities/Comments"
import { Votes } from "../Entities/Votes";
import { Tags } from "../Entities/tags";
config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [Users, Posts, Comments, Votes, Tags],
    subscribers: [],
    migrations: [],
});
