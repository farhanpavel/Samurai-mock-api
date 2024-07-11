const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/bookRoute");
require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;
const app = express();
app.use(express.json());
mongoose
  .connect(URL)
  .then(() => console.log("Successfully Connected"))
  .catch((err) => console.log("Not Connected"));
app.listen(PORT, () => {
  console.log(`${PORT} is Running`);
});
app.use("/api/books", route);
