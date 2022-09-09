var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as productsControllers from "../products/index.js";
const allCarts = [
    {
        id: 1,
        timestamp: "10/10/10",
        products: [
            {
                id: 1,
                timestamp: "10/10/10",
                name: "PRIMER CARRITO",
                description: "PRIOMERITO PRODUCTO",
                code: 10,
                image: "www.asdjahdas.com/foto",
                price: 3,
                stock: 7,
            },
            {
                id: 2,
                timestamp: "11/10/10",
                name: "silla",
                description: "sillona para comer",
                code: 1230,
                image: "www.asdjahdas1231.com/foto",
                price: 13,
                stock: 72,
            },
        ],
    },
    {
        id: 2,
        timestamp: "13/10/10",
        products: [
            {
                id: 1,
                timestamp: "10/10/10",
                name: "SEG CARRITO",
                description: "mesa para comer",
                code: 10,
                image: "www.asdjahdas.com/foto",
                price: 3,
                stock: 7,
            },
            {
                id: 3,
                timestamp: "11/10/10",
                name: "asdsadsad",
                description: "sillasdsadsaddaomer",
                code: 113,
                image: "www.asdjahdas1231.com/foto",
                price: 133,
                stock: 7422,
            },
        ],
    },
];
const createCart = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = {
        id: allCarts.length + 1,
        timestamp: Date.now().toString(),
        products: [],
    };
    allCarts.push(newCart);
    return res.status(201).json({
        message: "New cart created",
        data: newCart.id,
        error: false,
    });
});
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    try {
        if (!isNaN(idParam)) {
            const findCart = allCarts.filter((cart) => {
                return cart.id === idParam;
            });
            if (findCart.length !== 0) {
                // BORRARLO CON FILESYSTEM
                return res.status(204).send({
                    message: "Cart deleted",
                    data: findCart,
                    error: false,
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "Cart not found", data: null, error: true });
            }
        }
        else {
            return res.status(404).send({
                message: "Please enter a valid id",
                data: null,
                error: true,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            message: "An unexpected error has ocurred",
            data: null,
            error: true,
        });
    }
});
const getProductsInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    try {
        if (!isNaN(idParam)) {
            const findCart = allCarts.filter((cart) => {
                return cart.id === idParam;
            });
            if (findCart.length !== 0) {
                return res.status(200).send({
                    message: `Cart with id ${idParam} founded !`,
                    data: findCart[0].products,
                    error: false,
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "Cart not found", data: null, error: true });
            }
        }
        else {
            return res.status(404).send({
                message: "Please enter a valid id of cart",
                data: null,
                error: true,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            message: "An unexpected error has ocurred",
            data: null,
            error: true,
        });
    }
});
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProd = parseInt(req.params.idProd);
    const idCart = parseInt(req.params.id);
    try {
        if (isNaN(idCart) || isNaN(idProd)) {
            return res.status(400).send({
                message: `Please enter valid ids`,
                data: null,
                error: true,
            });
        }
        else {
            // valido los ids q exitan
            const existenceIdCart = allCarts.filter((cart) => {
                return cart.id === idCart;
            });
            const existenceIdProduct = productsControllers.default.storeProducts.filter((product) => {
                return product.id === idProd;
            });
            //si existen agrego el producto
            if (existenceIdCart.length > 0 && existenceIdProduct.length > 0) {
                // aca lo deberia agregar
                allCarts[idCart - 1].products.push(productsControllers.default.storeProducts[idProd - 1]);
                console.log('all carts', allCarts);
            }
            else {
                if (existenceIdCart.length === 0) {
                    return res.status(404).send({
                        message: `Id: ${idCart} of cart not found`,
                        data: null,
                        error: true,
                    });
                }
                if (existenceIdProduct.length === 0)
                    return res.status(404).send({
                        message: `Id: ${idProd}} of product not found`,
                        data: null,
                        error: true,
                    });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: `An unexpected error has ocurred`,
            data: null,
            error: true,
        });
    }
});
const deleteProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProd = parseInt(req.params.idProd);
    const idCart = parseInt(req.params.id);
    try {
        if (isNaN(idCart) || isNaN(idProd)) {
            return res.status(404).send({
                message: `Please enter valid ids`,
                data: null,
                error: true,
            });
        }
        else {
            const existenceIdCart = allCarts.filter((cart) => {
                return cart.id === idCart;
            });
            const existenceIdProduct = productsControllers.default.storeProducts.filter((product) => {
                return product.id === idProd;
            });
            if (existenceIdCart.length > 0 && existenceIdProduct.length > 0) {
                allCarts[idCart - 1].products.slice(idProd - 1, 1);
                return res.status(204).send({
                    message: `Product: ${existenceIdProduct[0]} was deleted`,
                    data: allCarts,
                    error: false,
                });
            }
            else {
                if (existenceIdCart.length === 0) {
                    return res.status(404).send({
                        message: `Id: ${idCart} of cart not found`,
                        data: null,
                        error: true,
                    });
                }
                if (existenceIdProduct.length === 0)
                    return res.status(404).send({
                        message: `Id: ${idProd} of product not found`,
                        data: null,
                        error: true,
                    });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: `An unexpected error has ocurred`,
            data: null,
            error: true,
        });
    }
});
export default {
    getProductsInCart,
    createCart,
    addProductToCart,
    deleteCart,
    deleteProductFromCart,
};
