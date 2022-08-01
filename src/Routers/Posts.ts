import express from "express";
import { Posts } from "../Entities/Posts";

const postsRouter = express.Router();

const getPostsCommentsNdVotes = (post: Posts) => {
    return {
        ...post,
        commentsTotal: post.comments.length,
        upVotesTotal: post.votes.filter(vote => vote.value === 1).length,
        dwonVotesTotal: post.votes.filter(vote => vote.value === -1).length
    }
}



postsRouter.get("/", async (req, res) => {
    try {
        const posts = await Posts.find({
            relations: { user: true, comments: { user: true }, votes: { user: true } }
        });
        if (!posts) return res.status(404).send("posts not found!")
        const returnposts = posts.map(getPostsCommentsNdVotes);
        res.status(200).send({ data: returnposts });
    } catch (e) {
        res.status(500).send();
    }
});

postsRouter.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const post = await Posts.findOne({
            where: { id },
            relations: { user: true, comments: { user: true }, votes: { user: true } }
        });
        if (!post) return res.status(404).send("posts not found!");
        res.status(200).send({ data: post });
    } catch (e) {
        res.status(500).send();
    }
});

postsRouter.post("/", async (req, res) => {
    try {
        const { title, body, user } = req.body;
        if (!title) return res.status(401).send("missing data");
        const post = Posts.create({
            title,
            body,
            user
        })
        if (!post) return res.status(404).send("posts not found!");
        await post.save();
        res.status(201).send({ data: post })
    } catch (e) {
        res.status(500).send("server down!");
    }
});

postsRouter.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const post = await Posts.delete(id);
        if (!post) return res.status(404).send("posts not found!");
        res.status(200).send("delted succefully!");
    } catch (e) {
        res.status(500).send();
    }
});

export default postsRouter;