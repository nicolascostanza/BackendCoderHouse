const storeProducts = [
  {
    title: "titulo",
    price: 31,
    thumbnail:
      "https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg",
  },
];
const majorId = () => {
  const ids = storeProducts.map((product) => product.id);
  if (ids.length === 0) {
    return 0;
  }
  return Math.max(...ids);
};

const getProductById = (id) => {
  const productFiltered = storeProducts.filter((product) => product.id == id);
  return productFiltered;
};

const getIndexById = (id) => {
  const index = storeProducts.findIndex((product) => product.id === id);
  return index;
};

const getAllProducts = (_req, res) => {
  try {
    if (storeProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "product list empty", data: null, error: false });
    } else {
      return res
        .status(200)
        .json({ message: "all products", data: storeProducts, error: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error has ocurred",
      data: null,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      res.status(404).json({
        message: "Send a number",
        data: null,
        error: true,
      });
    } else {
      const id = req.params.id;
      parseInt(id);
      const maxId = majorId();
      if (id > maxId || id < 1) {
        res.status(404).json({
          message: "Id not found",
          data: null,
          error: true,
        });
      } else {
        const prod = await getProductById(id);
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
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error has ocurred",
      data: undefined,
      error: true,
    });
  }
};

const createProduct = async (req, res) => {
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
      const id = majorId() + 1;
      const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: id,
      };
      storeProducts.push(product);
      res
        .json({
          message: "Product created !",
          data: product,
          error: false,
        })
        .status(201);
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

const putById = async (req, res) => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      res.status(404).json({
        message: "Send a number",
        data: null,
        error: true,
      });
    }
    index = getIndexById(parseInt(req.params.id));
    if (index === -1) {
      res.status(404).json({
        message: "id not found",
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
    const oldProduct = storeProducts[index];
    const newProduct = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      id: oldProduct.id,
    };
    storeProducts[index] = newProduct;
    res.status(200).json({
      message: "Product edited !",
      data: newProduct,
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

const deleteProduct = async (req, res) => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      res.status(404).json({
        message: "Send a number",
        data: null,
        error: true,
      });
    } else {
      const id = parseInt(req.params.id);
      const maxId = majorId();
      if (id > maxId || id < 1) {
        res.status(404).json({
          message: "Id not found",
          data: null,
          error: true,
        });
      } else {
        const index = getIndexById(id);
        if (index !== -1) {
          console.log("id", id);

          const productFiltered = getProductById(id);
          storeProducts.splice(index, 1);
          res.status(204).json({
            message: "product deleted !",
            data: productFiltered,
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
    }
  } catch (err) {
    return res.status(500).json({
      message: "There was an error",
      data: undefined,
      error: true,
    });
  }
};

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  putById,
  deleteProduct,
  storeProducts,
};
