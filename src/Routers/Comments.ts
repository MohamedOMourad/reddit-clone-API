import express from "express";
import { Comments } from "../Entities/Comments";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
    try {
        const comments = await Comments.find({
            relations: { user: true, post: true }
        });
        if (!comments) return res.status(404).send("posts not found!")
        res.status(200).send({ data: comments });
    } catch (e) {
        res.status(500).send();
    }
});

commentsRouter.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const comment = await Comments.findOne({
            where: { id },
            relations: { user: true, post: true }
        });
        if (!comment) return res.status(404).send("posts not found!");
        res.status(200).send({ data: comment });
    } catch (e) {
        res.status(500).send();
    }
});

commentsRouter.post("/", async (req, res) => {
    try {
        const { body, user, post } = req.body;
        if (!body) return res.status(401).send("missing data");
        const comment = Comments.create({
            body,
            post,
            user
        })
        if (!comment) return res.status(404).send("posts not found!");
        await comment.save();
        res.status(201).send({ data: comment })
    } catch (e) {
        res.status(500).send("server down!");
    }
});

commentsRouter.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const comment = await Comments.delete(id);
        if (!comment) return res.status(404).send("posts not found!");
        res.status(200).send("successfully deleted!");
    } catch (e) {
        res.status(500).send();
    }
});
export default commentsRouter;