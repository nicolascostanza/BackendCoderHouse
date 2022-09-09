import express from "express";
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);
app.use("*", function (req, res) {
    return res.status(404).json({ error: -2, descripcion: `ruta: ${req.url} - metodo: ${req.method} no implementada` });
});
app.listen(PORT, () => {
    console.log(`APP listen on port: ${PORT}`);
});
