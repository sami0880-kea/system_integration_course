import express from "express";

const app = express();

app.get("/expressData", (req, res) => {
  res.send({ data: "This is data from Express" });
});

app.get("/requestFastAPIData", async (req, res) => {
  const response = await fetch("http://127.0.0.1:8000/fastapiData");
  const data = await response.json();
  res.send(data);
});

app.get("/names/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);
  res.send({ data: `Your name is ${name}` });
});

app.get("/age/:age", (req, res) => {
  const age = Number(req.params.age);
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  console.log(`User was born in ${birthYear} or ${birthYear - 1}`);
  res.send({
    data: `You were born in ${
      birthYear - 1
    } or ${birthYear}, if you've already had your birthday this year`,
  });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
