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
let storeProducts: Array<product> = [
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
					.status(404)
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
	const isAdmin = req.body.isAdmin;
	if (!isAdmin) {
		return res
			.json({
				message: "You are not authorized to make this request",
				data: null,
				error: true,
			})
			.status(401);
	}
	const { timestamp, name, description, code, image, price, stock } = req.body;
	try {
		if (timestamp && name && description && code && image && price && stock) {
			const regexImg = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);
			const testImage = regexImg.test(image);
			const validateNewProduct = storeProducts.filter(
				(product) => product.name === name || product.code === parseInt(code)
			);
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
					.status(400);
			} else {
				const newProdToAdd: product = {
					id: storeProducts.length + 1,
					timestamp,
					name,
					description,
					code,
					image,
					price,
					stock,
				};
				storeProducts.push(newProdToAdd);
				return res
					.json({
						message: "Product added !",
						data: null,
						error: false,
					})
					.status(201);
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
const updateProduct = async (req, res) => {
	const isAdmin = req.body.isAdmin;
	if (!isAdmin) {
		return res
			.json({
				message: "You are not authorized to make this request",
				data: null,
				error: true,
			})
			.status(401);
	}
	const { timestamp, name, description, code, image, price, stock } = req.body;
	const idParam = parseInt(req.params.id);
	try {
		if (isNaN(idParam)) {
			return res
				.json({
					message: "Please enter a valid id",
					data: null,
					error: true,
				})
				.status(400);
		} else {
			const findProduct = storeProducts.filter((product) => {
				return product.id === idParam;
			});
			if (findProduct.length) {
				const regexImg = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);
				const testImage = regexImg.test(image);
				// pre mapeo de la lista de productos sin el seleccionado
				const productListWithOutId = storeProducts.filter(
					(prod) => prod.id !== idParam
				);
				const validateNewProduct = productListWithOutId.filter(
					(product) => product.name === name || product.code === parseInt(code)
				);
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
						.status(400);
				}
				const UpdateProduct: product = {
					id: idParam,
					timestamp,
					name,
					description,
					code,
					image,
					price,
					stock,
				};
				storeProducts[idParam - 1] = {
					...UpdateProduct,
				};
				return res
					.json({
						message: "Product Updated !",
						data: storeProducts,
						error: false,
					})
					.status(200);
			} else {
				return res
					.json({
						message: "Id not found",
						data: null,
						error: true,
					})
					.status(400);
			}
		}
	} catch (error) {
		return res
			.json({
				message: "An unexpected error has ocurred",
				data: null,
				error: true,
			})
			.status(500);
	}
};
const deleteProduct = async (req, res) => {
	const isAdmin = req.body.isAdmin;
	if (!isAdmin) {
		return res
			.json({
				message: "You are not authorized to make this request",
				data: null,
				error: true,
			})
			.status(401);
	}
	const idParam = parseInt(req.params.id);
	if (isNaN(idParam)) {
		return res
			.json({
				message: "Please enter a valid id",
				data: null,
				error: true,
			})
			.status(400);
	} else {
		const productToDelete = storeProducts.filter((product) => {
			return product.id === idParam;
		});
		if (productToDelete.length) {
			storeProducts.splice(idParam - 1, 1);
			return res
				.json({
					message: "Product Deleted",
					data: storeProducts,
					error: false,
				})
				.status(204);
		} else {
			return res
				.json({
					message: "Id not found",
					data: null,
					error: true,
				})
				.status(404);
		}
	}
};

export default {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
};
