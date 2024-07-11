const express = require("express");
const {
  getControl,
  getControlId,
  postControl,
  putControl,
} = require("../controllers/bookController");

const route = express.Router();
route.get("/", getControl);
route.get("/:id", getControlId);
route.post("/", postControl);
route.put("/:id", putControl);

module.exports = route;
