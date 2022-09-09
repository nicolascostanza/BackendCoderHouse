interface product {
  id: number;
  timestamp: string;
  name: string;
  description: string;
  code: number;
  image: string;
  price: number;
  stock: number;
}
const storeProducts: Array<product> = [
  {
    id: 1,
    timestamp: "10/10/10",
    name: "mesa",
    description: "mesa para comer",
    code: 10,
    image: "www.asdjahdas.com/foto",
    price: 3,
    stock: 7,
  },
  {
    id: 2,
    timestamp: "10/10/10",
    name: "silla",
    description: "silla para comer",
    code: 20,
    image: "www.asdjahdas.com/foto",
    price: 100,
    stock: 7,
  },
  {
    id: 3,
    timestamp: "10/10/10",
    name: "mouse",
    description: "mnouseee",
    code: 30,
    image: "www.asdjahdas.com/foto",
    price: 100,
    stock: 7,
  },
];

const getProducts = async (req, res) => {
  const idParam = parseInt(req.params.id);
  try {
    if (!isNaN(idParam)) {
      const findProduct = storeProducts.filter((product) => {
        return product.id === idParam;
      });
      if (findProduct.length !== 0) {
        res.status(200).send({
          message: "Product found !",
          data: findProduct,
          error: false,
        });
      } else {
        res
          .status(200)
          .json({ message: "Product not found", data: null, error: false });
      }
    } else {
      if (storeProducts.length > 0) {
        return res.status(200).json({
          message: "all products",
          data: storeProducts,
          error: false,
        });
      } else {
        return res
          .status(200)
          .json({ message: "product list empty", data: null, error: false });
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

const addProduct = async (req, res) => {
  const { timestamp, name, description, code, image, price, stock } = req.body;
  try {
    if (timestamp && name && description && code && image && price && stock) {
      const regexImg = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);
      const testImage = regexImg.test(image);
      const validateNewProduct = storeProducts.filter(
        (product) => product.name === name || product.code === parseInt(code)
      );
      console.log("validateNewProduct", validateNewProduct.length);
      if (!testImage) {
        return res
          .json({
            message: "image invalid, please enter a valid url !",
            data: null,
            error: true,
          })
          .status(400);
      }
      if (validateNewProduct.length) {
        return res
          .json({
            message: "Code or name in use !",
            data: null,
            error: false,
          })
          .status(200);
      } else {
        const newProdToAdd = {
          id: storeProducts.length + 1,
          timestamp,
          name,
          description,
          code,
          image,
          price,
          stock,
        };
        console.log("newProdToAdd", newProdToAdd);
        storeProducts.push(newProdToAdd);
        return res
          .json({
            message: "Product added !",
            data: null,
            error: false,
          })
          .status(200);
      }
    } else {
      return res
        .json({
          message:
            "Please send all fields: timestamp, name, description, code, image, price and stock",
          data: null,
          error: false,
        })
        .status(200);
    }
  } catch (error) {
    return res
      .json({
        message: "An error has ocurred",
        data: null,
        error: true,
      })
      .status(500);
  }
};
const updateProduct = async (req, res) => {};
const deleteProduct = async (req, res) => {};

// const getAllProducts = async (_req, res) => {
//   try {
//     if (storeProducts.length === 0) {
//       res
//         .status(200)
//         .json({ message: "product list empty", data: null, error: false });
//     } else {
//       res
//         .status(200)
//         .json({ message: "all products", data: storeProducts, error: false });
//     }
//   } catch (error) {
//     return res
//       .json({
//         message: "An error has ocurred",
//         data: undefined,
//         error: true,
//       })
//       .status(500);
//   }
// };

// const getById = async (req, res) => {
//   try {
//     if (isNaN(parseInt(req.params.id))) {
//       res.status(404).json({
//         message: "Send a number",
//         data: null,
//         error: true,
//       });
//     } else {
//       const id = req.params.id;
//       parseInt(id);
//       const maxId = majorId();
//       if (id > maxId || id < 1) {
//         res.status(404).json({
//           message: "Id not found",
//           data: null,
//           error: true,
//         });
//       } else {
//         const prod = await getProductById(id);
//         if (prod.length !== 0) {
//           res.status(200).json({
//             message: "Product finded !!",
//             data: prod,
//             error: false,
//           });
//         } else {
//           res.status(404).json({
//             message: "Product not found",
//             data: null,
//             error: true,
//           });
//         }
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "An error has ocurred",
//       data: undefined,
//       error: true,
//     });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     if (req.body.title && req.body.price && req.body.thumbnail) {
//       const id = majorId() + 1;
//       const product = {
//         title: req.body.title,
//         price: req.body.price,
//         thumbnail: req.body.thumbnail,
//         id: id,
//       };
//       storeProducts.push(product);
//       res
//         .json({
//           message: "Product created !",
//           data: product,
//           error: false,
//         })
//         .status(201);
//     } else {
//       res.status(400).json({
//         message: "Invalid body",
//         data: null,
//         error: "La petición no es correcta",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       data: undefined,
//       error: true,
//     });
//   }
// };

// const putById = async (req, res) => {
//   try {
//     if (isNaN(parseInt(req.params.id))) {
//       res.status(404).json({
//         message: "Send a number",
//         data: null,
//         error: true,
//       });
//     }
//     const index = getIndexById(parseInt(req.params.id));
//     if (index === -1) {
//       res.status(404).json({
//         message: "id not found",
//         data: null,
//         error: true,
//       });
//     }
//     if (!(req.body.title || req.body.price || req.body.thumbnail)) {
//       res.status(400).json({
//         message: "invalid body",
//         data: null,
//         error: true,
//       });
//     }
//     const oldProduct = storeProducts[index];
//     const newProduct = {
//       title: req.body.title,
//       price: req.body.price,
//       thumbnail: req.body.thumbnail,
//       id: oldProduct.id,
//     };
//     storeProducts[index] = newProduct;
//     res.status(200).json({
//       message: "Product edited !",
//       data: newProduct,
//       error: false,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "There was an error",
//       data: undefined,
//       error: true,
//     });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     if (isNaN(parseInt(req.params.id))) {
//       res.status(404).json({
//         message: "Send a number",
//         data: null,
//         error: true,
//       });
//     } else {
//       const id = parseInt(req.params.id);
//       const maxId = majorId();
//       if (id > maxId || id < 1) {
//         res.status(404).json({
//           message: "Id not found",
//           data: null,
//           error: true,
//         });
//       } else {
//         const index = getIndexById(id);
//         if (index !== -1) {
//           console.log("id", id);

//           const productFiltered = getProductById(id);
//           storeProducts.splice(index, 1);
//           res.status(204).json({
//             message: "product deleted !",
//             data: productFiltered,
//             error: false,
//           });
//         } else {
//           res.status(404).json({
//             message: "Product not found",
//             data: null,
//             error: true,
//           });
//         }
//       }
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: "There was an error",
//       data: undefined,
//       error: true,
//     });
//   }
// };

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
