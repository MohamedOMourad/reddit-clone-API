import express from "express";
import { Users } from "../Entities/Users";
import axios from 'axios';

const userRouter = express.Router();



//Get All Users
userRouter.get("/", async (req, res) => {
    try {
        const users = await Users.find({
            relations: { post: true, comments: true }
        });
        if (!users) return res.status(404).send("not found!")
        res.status(200).send({ data: users })
    } catch (e) {
        res.status(500).send("server down!");
    }
});


//Get User By Id
userRouter.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const user = await Users.findOne({
            where: { id },
            relations: { post: true, comments: true }
        });
        if (!user) return res.status(404).send("not Found!");
        res.status(200).send({ data: user });
    } catch (e) {
        res.status(500).send("server down!");
    }
});

//Post Add New User
userRouter.post("/", async (req, res) => {
    try {
        const data = await axios.get('https://randomuser.me/api/')
        const imgUrl = data.data.results["0"].picture.thumbnail;

        const { firstName, lastName, Email } = req.body;
        if (!firstName && !lastName && !Email)
            return res.status(401).send("missing data");
        const user = await Users.create({ ...req.body, imgUrl });
        await user.save();
        res.status(201).send("created successfully");
    } catch (e) {
        res.status(500).send("server down!");
    }
});

//Delete User
userRouter.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const user = await Users.delete(id);
        res.status(200).send("delted succefully!");
    } catch (e) {
        res.status(500).send("server down!");
    }
});

export default userRouter;
