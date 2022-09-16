var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
const createCart = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCartsToBD = yield fs.readFile("dist/store/carts.txt", "utf-8");
        const allCartsInJson = JSON.parse(allCartsToBD);
        const newCart = {
            id: allCartsInJson.length + 1,
            timestamp: Date.now().toString(),
            products: [],
        };
        allCartsInJson.push(newCart);
        fs.writeFile("dist/store/carts.txt", JSON.stringify(allCartsInJson, null, 2));
        return res.status(201).json({
            message: `New cart created id: ${newCart.id}`,
            data: newCart.id,
            error: false,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `An error has ocurred: ${error}`,
            data: undefined,
            error: true,
        });
    }
});
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    try {
        if (!isNaN(idParam)) {
            const allCartsToBD = yield fs.readFile("dist/store/carts.txt", "utf-8");
            const allCartsInJson = JSON.parse(allCartsToBD);
            const findCart = allCartsInJson.filter((cart) => {
                return cart.id !== idParam;
            });
            if (findCart.length !== allCartsInJson.length) {
                fs.writeFile("dist/store/carts.txt", JSON.stringify(findCart, null, 2));
                return res.status(200).send({
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
            message: `An unexpected error has ocurred: ${error}`,
            data: null,
            error: true,
        });
    }
});
const getProductsInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    try {
        if (!isNaN(idParam)) {
            const allCartsToBD = yield fs.readFile("dist/store/carts.txt", "utf-8");
            const allCartsInJson = JSON.parse(allCartsToBD);
            const findCart = allCartsInJson.filter((cart) => {
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
            const allCartsToBD = yield fs.readFile("dist/store/carts.txt", "utf-8");
            const allCartsInJson = JSON.parse(allCartsToBD);
            const allProductsDB = yield fs.readFile("dist/store.txt", "utf-8");
            const allProductsToJson = JSON.parse(allProductsDB);
            const existenceIdCart = allCartsInJson.filter((cart) => {
                return cart.id === idCart;
            });
            const existenceIdProduct = allProductsToJson.filter((product) => {
                return product.id === idProd;
            });
            if (existenceIdCart.length > 0 && existenceIdProduct.length > 0) {
                allCartsInJson[idCart - 1].products.push(existenceIdProduct[0]);
                fs.writeFile("dist/store/carts.txt", JSON.stringify(allCartsInJson, null, 2));
                return res.status(201).json({
                    message: `New product added a cart with id: ${idCart}`,
                    data: allCartsInJson[idCart - 1].products,
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
            const allCartsToBD = yield fs.readFile("dist/store/carts.txt", "utf-8");
            const allCartsInJson = JSON.parse(allCartsToBD);
            const allProductsDB = yield fs.readFile("dist/store.txt", "utf-8");
            const allProductsToJson = JSON.parse(allProductsDB);
            const existenceIdCart = allCartsInJson.filter((cart) => {
                return cart.id === idCart;
            });
            const existenceIdProduct = allProductsToJson.filter((product) => {
                return product.id === idProd;
            });
            if (existenceIdCart.length > 0 && existenceIdProduct.length > 0) {
                const newProductList = allCartsInJson[idCart - 1].products.filter((prod) => prod.id !== idProd);
                allCartsInJson[idCart - 1].products = newProductList;
                fs.writeFile("dist/store/carts.txt", JSON.stringify(allCartsInJson, null, 2));
                return res.status(200).send({
                    message: `Product was deleted successfully`,
                    data: allCartsInJson[idCart - 1],
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
