import express from "express";
import data from "./dataset.json";

const app = express();
const PORT = 3000;

// server is running
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
