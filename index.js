const { promises: fs } = require("fs");

class Container {
  constructor(path) {
    this.path = path;
  }
  async save(newObject) {
    let newId;
    const allObjects = await this.getAll();
    if (allObjects.length === 0) {
      newId = 1;
    } else {
      const lastId = allObjects[allObjects.length - 1].id;
      newId = lastId + 1;
    }
    allObjects.push({ ...newObject, id: newId });
    try {
      await fs.writeFile(this.path, JSON.stringify(allObjects, null, 2));
      return newId;
    } catch (error) {
      throw new Error(`An error occurred when saving the file: ${error}`);
    }
  }
  async getById(idSelected) {
    try {
      const allObjects = await this.getAll();
      const filteredObject = allObjects.find((elem) => elem.id === idSelected);
      const response = filteredObject === undefined ? null : filteredObject;
      return response;
    } catch (error) {
      throw new Error(`An error occurred when filtered data: ${error}`);
    }
  }
  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  async deleteById(id) {
    const allObjects = await this.getAll();
    const newData = allObjects.filter((elem) => elem.id !== id);
    if (newData.length === allObjects.length) {
      throw new Error(`Error while deleting. The id: ${id} was not found.`);
    }
    try {
      await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
    } catch (error) {
      throw new Error(`Error while deleting.`);
    }
  }
  async deleteAll() {
    try {
      await fs.writeFile(this.path, "");
    } catch (error) {
      throw new Error(`Error while deleting.`);
    }
  }
}

(async function showResults(){
	const productList = new Container("./products.txt");

	await productList.save({
		title: 'table',
		price: '23 USD',
		thumbnail: `www.ecommerce.com/table`
	});
	await productList.save({
		title: 'chair',
		price: '12 USD',
		thumbnail: `www.ecommerce.com/chair`
	});
	await productList.getById(1);
	await productList.getAll();
	await productList.deleteById(1);
	await productList.deleteAll();
})();