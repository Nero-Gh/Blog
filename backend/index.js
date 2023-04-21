import express from "express";
import post from "./routes/posts.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", post);

//server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
