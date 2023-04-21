import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: process.env.DB_PASSWORD,
  database: "myblog",
});

db.connect(function (err) {
  if (err) {
    console.log(`There was Database connection error: ${err}`);
  } else {
    console.log("Database connection successfully");
  }
});
