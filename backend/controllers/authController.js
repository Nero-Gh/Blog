import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  let { email, username, password } = req.body;

  //check existing user
  const query = "SELECT * FROM users WHERE email = ? or username= ?";

  db.query(query, [email, username], (err, data) => {
    if (err)
      return res
        .status(500)
        .json(`there is an err when checking if user exit: ${err}`);
    if (data.length) return res.status(409).json("User already exit!");

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const query =
      "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";
    const values = [username, password, hashPassword];

    db.query(query, [values], (err, data) => {
      if (err)
        return res.json(`There is an error when registering user: ${err}`);
      return res.status(200).json("User created Successfully");
    });
  });
};

export const login = (req, res) => {
  const { username } = req.body;

  //check user
  const query = "SELECT * FROM users WHERE username= ?";

  db.query(query, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    //if user exit pass data to cookie
    const token = jwt.sign({ id: data[0].id }, "jwtkey");

    // seperate the some data from the rest of the datas
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
