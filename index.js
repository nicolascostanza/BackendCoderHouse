const express = require("express");
const { Container } = require("./class");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  res.send(
    `<h1>available routes:</h1>
    <h2>1) /products --> to go to the list of products.</h2>
    <h2>2) /randomProduct --> to get a product at random</h2>`
  );
});

app.get("/products", async (_req, res) => {
  try {
    const productList = await new Container("products.txt");
    await productList.save({
      title: "table",
      price: "23 USD",
      thumbnail: `www.ecommerce.com/table`,
    });
    await productList.save({
      title: "chair",
      price: "12 USD",
      thumbnail: `www.ecommerce.com/chair`,
    });
    await productList.save({
      title: "slate",
      price: "5 USD",
      thumbnail: `www.ecommerce.com/slate`,
    });
    await productList.save({
      title: "door",
      price: "7 USD",
      thumbnail: `www.ecommerce.com/door`,
    });
    const allProducts = await productList.getAll();
    res.json(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/randomProduct", async (_req, res) => {
  try {
    const productList = await new Container("products.txt");
    const allProducts = await productList.getAll();
    if (allProducts.length < 1 || allProducts === null) {
      res.send(`<h1>Empty product list</h1>`);
    }
    const allIds = allProducts.map((product) => product.id);
    const selectedId = Math.floor(Math.random() * allIds.length);
    const oneProduct = await productList.getById(selectedId);
    res.json(oneProduct);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});
