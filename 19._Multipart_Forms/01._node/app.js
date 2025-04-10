import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const app = express();
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(undefined, "uploads/");
  },
  filename: (req, file, cb) => {
    // const uniquePrefix = uuidv4();
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uniqueFilename = `${uniquePrefix}_${file.originalname}`;

    cb(undefined, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  const validTypes = ["image/jpeg", "image/png", "image/svg"];
  if (!validTypes.includes(file.mimetype)) {
    cb(new Error("File type not allowed " + file.mimetype), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

app.use(express.urlencoded({ extended: true }));

app.post("/form", (req, res) => {
  console.log(req.body);
  delete req.body.password;
  res.send(req.body);
});

app.post("/fileform", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port`, PORT));
