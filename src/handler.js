const { nanoid } = require('nanoid');
const books = require('./books');

const responseSuccess = (h, message, data = null, statusCode = 200) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(statusCode);
  return response;
};

const responseFail = (h, message, statusCode) => {
  const response = h.response({
    status: 'fail',
    message,
  });
  response.code(statusCode);
  return response;
};

// menyimpan buku
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return responseFail(h, 'Gagal menambahkan buku. Mohon isi nama buku', 400);
  }

  if (readPage > pageCount) {
    return responseFail(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === id);

  return isSuccess
    ? responseSuccess(h, 'Buku berhasil ditambahkan', { bookId: id }, 201)
    : responseFail(h, 'Buku gagal ditambahkan', 500);
};

// menampilkan buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
  }

  const responseData = {
    books: filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  };

  return responseSuccess(h, 'Berhasil menampilkan buku', responseData);
};

// menampilkan buku spesifik
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.find((b) => b.id === id);

  return book
    ? responseSuccess(h, 'Buku ditemukan', { book })
    : responseFail(h, 'Buku tidak ditemukan', 404);
};

// mengedit data buku
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (!name) {
      return responseFail(h, 'Gagal memperbarui buku. Mohon isi nama buku', 400);
    }

    if (readPage > pageCount) {
      return responseFail(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    return responseSuccess(h, 'Buku berhasil diperbarui');
  }

  return responseFail(h, 'Gagal memperbarui buku. Id tidak ditemukan', 404);
};

// menghapus buku
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return responseSuccess(h, 'Buku berhasil dihapus');
  }

  return responseFail(h, 'Buku gagal dihapus. Id tidak ditemukan', 404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
