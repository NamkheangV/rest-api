// var cors = require("cors");
// var express = require("express");
import express from "express";
import cors from "cors";

import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb",
});

var app = express();
app.use(cors());
app.use(express.json());

// Read ทั้งหมด
app.get("/users:id", function (req, res, next) {
  connection.query("SELECT * FROM users", function (err, results, fields) {
    res.json(results);
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  });
});

// Read ระบุ id
app.get("/users/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE `id` = ?",
    [id],
    function (err, results) {
      res.json(results);
      // console.log(results);
    }
  );
});

// Create ระบุ id
app.post("/users", function (req, res, next) {
  connection.query(
    "INSERT INTO users (`fname`, `lname`, `username`, `password`) VALUES (?, ?, ?, ?)",
    [req.body.fname, req.body.lname, req.body.username, req.body.password],
    function (err, results) {
      res.json(results);
      // console.log(results);
    }
  );
});

// Update ระบุ id
app.put("/users", function (req, res, next) {
  connection.query(
    "UPDATE `users` SET `fname` = ?, `lname` = ?, `username` = ?, `password` = ? WHERE `id` = ?",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.password,
      req.body.id,
    ],
    function (err, results) {
      res.json(results);
      // console.log(results);
    }
  );
});

// Delete ระบุ id
app.delete("/users", function (req, res, next) {
  connection.query(
    "DELETE FROM `users` WHERE `id` = ?",
    [req.body.id],
    function (err, results) {
      res.json(results);
      // console.log(results);
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
