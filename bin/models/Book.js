const fs = require('fs');
let listBooks = [];

class Book {
    constructor(title, pages, year, isbn, author) {
        this.title = title;
        this.pages = pages;
        this.year = year;
        this.isbn = isbn;
        this.author = author;
    }

    create(book) {

        this.find();

        listBooks.push(book);

        this.write();

        return 'Book saved!';
    }

    find() {

        let exists = fs.existsSync('./storage/book.json');

        if (exists) {
            listBooks = JSON.parse(fs.readFileSync('./storage/book.json'));
        }

        return listBooks;
    }

    findISBN(isbn) {

        let position = this.findIntoList(isbn);

        return listBooks[position];
    }

    findIntoList(isbn) {

        this.find();

        let position = listBooks.findIndex((e) => e.isbn === isbn);

        if (position === -1) {
            throw new Error('Book not found!');
        }

        return position;
    }

    delete(isbn) {

        let position = this.findIntoList(isbn);

        listBooks.splice(position, 1);

        this.write();

        return 'Book deleted!';

    }

    update(isbn, book){

        let position = this.findIntoList(isbn);

        let keys = Object.keys(book);

        keys.forEach((e)=>{
            if(book[e]!==undefined){
                listBooks[position][e] = book[e];
            } 
        });

        this.write();

        return 'Book updated!'

    }

    write() {
        fs.writeFile('./storage/book.json', JSON.stringify(listBooks), (err) => {
            if (err) {
                throw new Error('Book not saved!');
            }
        });
    }

}

module.exports = Book;
