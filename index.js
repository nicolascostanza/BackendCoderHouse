class User {
  constructor(name, surname) {
    this.name = name,
    this.surname = surname,
    this.books = [],
    this.pets = []
  }
  getFullName() {
    const nameFormatted =
      this.name.substring(0, 1).toUpperCase() +
      this.name.substring(1).toLowerCase();
    const surnameFormatted =
      this.surname.substring(0, 1).toUpperCase() +
      this.surname.substring(1).toLowerCase();
    return `The name is ${nameFormatted} ${surnameFormatted}`;
  }
  addMascota(pet) {
    if (pet !== `${pet}`) return "please enter a string";
    this.pets.push(pet);
  }
  countMascotas() {
    return `${this.name}'s pet number is ${this.pets.length}`;
  }
  addBook(nameBook, author) {
    if (nameBook !== `${nameBook}` || author !== `${author}`)
      return "please enter a string in the name of the book or author";
    this.books.push({ nameBook: nameBook, author: author });
  }
  getBookNames() {
    return this.books.map((book) => book.nameBook);
  }
}
const user = new User("Nicolas", "Costanza");
user.getFullName();
user.addMascota("Rocco");
user.addMascota("Gina");
user.countMascotas();
user.addBook("Principito", "Antoine de Saint-Exupéry");
user.addBook("martin fierro", "José Hernández");
user.getBookNames();
console.log("User: ", user);
