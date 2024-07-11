const express = require("express");
const mongoose = require("mongoose");
const bookSchema = require("../models/bookSchema");
const Book = mongoose.model("book", bookSchema);
exports.getControl = async (req, res) => {
  try {
    const bookData = await Book.find();
    res.status(200).json({ books: bookData });
  } catch {
    res.status(404);
  }
};
exports.getControlId = async (req, res) => {
  try {
    const bookData = await Book.findOne({ id: req.params.id });
    if (bookData == null) {
      throw err;
    }
    res.status(200).json(bookData);
  } catch {
    res
      .status(404)
      .json({ message: `book with id: ${req.params.id} was not found` });
  }
};
exports.postControl = async (req, res) => {
  try {
    const bookData = await Book.create(req.body);
    res.status(201).json(bookData);
  } catch (err) {
    res.status(500).json("not working");
  }
};
exports.putControl = async (req, res) => {
  try {
    const bookData = await Book.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );
    if (bookData.matchedCount == 0) {
      throw err;
    }
    res.status(200).json(bookData);
  } catch {
    res
      .status(404)
      .json({ message: `book with id: ${req.params.id} was not found` });
  }
};
