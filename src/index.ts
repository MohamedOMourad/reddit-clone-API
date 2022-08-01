import "reflect-metadata";
import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { AppDataSource } from "./DB/connection";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./Routers/Users";
import postsRouter from "./Routers/Posts";
import commentsRouter from "./Routers/Comments";
import votesRoute from "./Routers/Votes";
import TagRoute from "./Routers/Tags";

const app = express();
config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/votes", votesRoute);
app.use("/tags", TagRoute);

app.get("/*", (req, res) => {
    res.status(404).send({ error: "End Point NOt Found!" });
});

app.listen(process.env.PORT, async () => {
    try {
        await AppDataSource.initialize();
        console.log(`connected to the database`)
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
})