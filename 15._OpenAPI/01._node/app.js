import express from "express";
import usersRouter from "./routers/usersRouter.js";
import swaggerRouter from "./routers/swaggerRouter.js";
const app = express();
app.use(express.json());

app.use(usersRouter);
app.use(swaggerRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
