const request = require('supertest');
const app = require('../../app');

describe('Book', () => {
    let server;
    const port = 3000;

    const book = {
        title: 'El Moro',
        pages: 32,
        year: 1987,
        isbn: '456-789-1230-X1',
        author: 'José Manuel Marroquín'
    }

    beforeAll((done) => {
        server = app.listen(port);
        done();
    });

    afterAll((done) => {
        server.close();
        done();
    })

    test('should get all books', async (done) => {
        const res = await request(server)
            .get('/api/v1/book/list');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({ listBooks: expect.any(Array) }))

        done();
    });

    test('should create a book and return a message', async (done) => {
        const res = await request(server)
            .post('/api/v1/book/create')
            .send(book);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, message: 'Book saved!' });

        done();
    });

    test('should get a book by ISBN', async (done) => {
        const res = await request(server)
            .get(`/api/v1/book/${book.isbn}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, book })

        done();
    });

    test('should update a book and return a message', async (done) => {
        const res = await request(server)
            .put(`/api/v1/book/update/${book.isbn}`)
            .send({
                title: 'El Morado',
                isbn: book.isbn
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, message: 'Book updated!' })

        done();
    });

    test('should delete a book and return a message', async (done) => {
        const res = await request(server)
            .delete(`/api/v1/book/delete/${book.isbn}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, message: 'Book deleted!' });

        done();
    });

})
