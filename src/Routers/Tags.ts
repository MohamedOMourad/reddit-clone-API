import express from "express";
import { In } from "typeorm";
import { Comments } from "../Entities/Comments";
import { Posts } from "../Entities/Posts";
import { Tags } from "../Entities/tags";
import { Users } from "../Entities/Users";
import { Votes } from "../Entities/Votes";

const TagRoute = express.Router();

TagRoute.get("/", async (req, res) => {
    try {
        const tags = await Tags.find();
        if (!tags) return res.status(404).send("posts not found!")
        res.status(200).send({ data: tags });
    } catch (e) {
        res.status(500).send();
    }
});

TagRoute.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const tag = await Tags.findOne({
            where: { id },
        });
        if (!tag) return res.status(404).send("posts not found!");
        res.status(200).send({ data: tag });
    } catch (e) {
        res.status(500).send();
    }
});

TagRoute.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(401).send("missing data should be ( 1 or -1)");
        const tag = Tags.create({
            name
        })
        if (!tag) return res.status(404).send("vote not found!");
        await tag.save();
        res.status(201).send({ data: tag })
    } catch (e) {
        res.status(500).send("server down!");
    }
});

TagRoute.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const tag = await Tags.delete(id);
        if (!tag) return res.status(404).send("posts not found!");
        res.status(200).send("successfully deleted!");
    } catch (e) {
        res.status(500).send();
    }
});

TagRoute.post("/link", async (req, res) => {
    try {
        const { tagId, postId } = req.body;

        const tag = await Tags.find({ where: { id: In(tagId) } });

        const post = await Posts.findOne({ where: { id: postId },relations:{tags:true}});

        if (!tag || !post) return res.status(404).send("posts not found!");
        console.log(tag, post)
        post.tags.push(...tag)

        await post.save()

        res.status(200).send({ post });

    } catch (e) {
        res.status(500).send();
    }
});
export default TagRoute;