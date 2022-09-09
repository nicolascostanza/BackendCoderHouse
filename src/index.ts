import express from "express";
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});