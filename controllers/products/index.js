import productsDatabase from "../../database/productsDatabase.js";
import { options as productOptions } from "../../database/options/productOptions.js";

const db = new productsDatabase(productOptions);

export const storeProducts = [
  {
    title: "ball",
    price: 31,
    thumbnail:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/28530d07245942fc944dae680084fb30_9366/Pelota_Al_Rihla_Pro_Blanco_H57783_01_standard.jpg",
  },
];

export const getAllProducts = async (_req, res) => {
  try {
    const productos = await db.getAll();
    console.log("productos de controllers", productos);
    return productos;
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

export const getById = async (req, res) => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      res.status(404).json({
        message: "Send a number",
        data: null,
        error: true,
      });
    } else {
      const id = req.params.id;
      const prod = await db.getById(id);
      if (prod.length !== 0) {
        res.status(200).json({
          message: "Product finded !!",
          data: prod,
          error: false,
        });
      } else {
        res.status(404).json({
          message: "Product not found",
          data: null,
          error: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error has ocurred",
      data: undefined,
      error: true,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    if (req.body.title && req.body.price && req.body.thumbnail) {
      let regexImg = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);
      const testImage = regexImg.test(req.body.thumbnail);
      if (!testImage) {
        return res
          .json({
            message: "thumbnail invalid !",
            data: null,
            error: true,
          })
          .status(400);
      }
      const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
      };
      const response = await db.saveProduct(product);
      return response;
      // res
      // .json({
      //   message: "Product created !",
      //   data: response,
      //   error: false,
      // })
      // .status(201);
    } else {
      res.status(400).json({
        message: "Invalid body",
        data: null,
        error: "La petición no es correcta",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export const putById = async (req, res) => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      res.status(404).json({
        message: "Send a number",
        data: null,
        error: true,
      });
    }
    if (!(req.body.title || req.body.price || req.body.thumbnail)) {
      res.status(400).json({
        message: "invalid body",
        data: null,
        error: true,
      });
    }
    const id = req.params.id;
    const productToEdited = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    };
    const response = await db.updateById(req.params.id, productToEdited);
    res.status(200).json({
      message: "Product edited !",
      data: response,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: "There was an error",
      data: undefined,
      error: true,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await client.getById(id);
    if (producto.length != 0) {
      await db.deleteById(id);
      res.status(200).json({ message: "producto borrado con exito" });
    } else {
      res.status(400).json({ error: "no existen productos con este id" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
