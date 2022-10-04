import { options as chatOptions } from "../../database/options/chatOptions.js";
import ChatDatabase from "../../database/chatDatabase.js";

const db = new ChatDatabase(chatOptions);

export const createTable = async () => {
  try {
    await db.createTableChat();
  } catch (error) {
    console.error(`El error es: ${error}`);
  }
};

export const chatRead = async () => {
  try {
    const messages = await db.getMessages();
    return messages;
  } catch (error) {
    console.error(`El error es: ${error}`);
  }
};

export const messageInsert = async (message) => {
  try {
    await db.saveMessage(message);
  } catch (error) {
    console.error(`El error es: ${error}`);
  }
};


