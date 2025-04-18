const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./Router");

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    try {
        res.status(200).send({ msg: "pong" });
    } catch (error) {
        res.status(500).send({ msg: "Server error occurred", error });
    }
});

app.get("/", (req, res) => {
    try {
        res.status(200).send({ msg: "mongodb connected" });
    } catch (error) {
        res.status(500).send({ msg: "Server error occurred", error });
    }
});


app.use("/snack",router);

app.listen(3000, async(err) => {
    console.log(process.env.MONGO_URL)
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Server connected successfully on port 3000");

        
    } catch (error) {
        console.error("Failed to start the server");
    }
    
});