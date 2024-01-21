const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

let db;
app.use(cors());
app.use(express.json());

const url = process.env.DB_URL;
const dbName = "treausreHunt"; //Database name
const collectionName = "leaderboard"; // LeaderBoard
const stockCollection = "stock"; // StockCollection

MongoClient.connect(url)
  .then((client) => {
    db = client.db(dbName);
    console.log("Successfully established connection with MongoDB");
  })
  .catch((err) => {
    throw err;
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
