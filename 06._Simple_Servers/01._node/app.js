import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ data: "Hello World" });
});

app.get("/greetings", (req, res) => {
  res.send({ data: "Greetings!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
