import express from "express";
import { Comments } from "../Entities/Comments";
import { Posts } from "../Entities/Posts";
import { Users } from "../Entities/Users";
import { Votes } from "../Entities/Votes";

const votesRoute = express.Router();

votesRoute.get("/", async (req, res) => {
    try {
        const votes = await Votes.find({
            relations: { user: true, post: true }
        });
        if (!votes) return res.status(404).send("posts not found!")
        res.status(200).send({ data: votes });
    } catch (e) {
        res.status(500).send();
    }
});

votesRoute.get("/:userId/:postId", async (req, res) => {
    try {
        const { userId, postId } = req.params;
        const vote = await Votes.findOne({
            where: {
                userId: +userId,
                postId: +postId
            },
            relations: { user: true, post: true }
        });
        if (!vote) return res.status(404).send("posts not found!");
        res.status(200).send({ data: vote });
    } catch (e) {
        res.status(500).send();
    }
});

votesRoute.post("/", async (req, res) => {
    try {
        const { value, userId, postId } = req.body;
        if (value !== 1 && value !== -1) return res.status(401).send("missing data should be ( 1 or -1)");
        const vote = Votes.create({
            value,
            userId,
            postId
        })

        if (!vote) return res.status(404).send("vote not found!");
        await vote.save();
        res.status(201).send({ data: vote })
    } catch (e) {
        res.send(e)
        // res.status(500).send("server down!");
    }
});

votesRoute.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const vote = await Votes.delete(id);
        if (!vote) return res.status(404).send("posts not found!");
        res.status(200).send("successfully deleted!");
    } catch (e) {
        res.status(500).send();
    }
});
export default votesRoute;