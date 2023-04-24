import express from "express";
import post from "./routes/posts.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//uploads
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (res, req) {
  const file = req.file;
  res.status(200).json(file.filename ? file.filename : "Image uploaded");
});

// routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", post);

//server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
