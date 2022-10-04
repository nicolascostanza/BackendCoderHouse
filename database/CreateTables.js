import ChatDatabase from "./chatDatabase.js";
import { options as chatOptions } from "./options/chatOptions.js";
import productsDatabase from "./productsDatabase.js";
import { options as productOptions } from "./options/productOptions.js";

const clientChat = new ChatDatabase(chatOptions)
const clientProducts = new productsDatabase(productOptions);

const createTableChat = async () => {
    await clientChat.createTableChat()
    console.log('tabla de chat creada');
}

const createTableProducts = async () => {
  await clientProducts.crearTabla();
  console.log("tabla productos creada");
};

createTableChat()
createTableProducts();
