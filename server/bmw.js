const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

const bmwRouter = require("./routes/bmw");

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.ncmc5t2.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/bmw", bookRouter);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));