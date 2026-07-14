import api from '../api/axios';

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  quantity: number;
  available: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  data: Book[];
  total: number;
  page: number;
  limit: number;
}

export const getBooks = async (
  page = 1,
  limit = 10,
  keyword = '',
) => {
  const response = await api.get<BookResponse>('/books', {
    params: {
      page,
      limit,
      keyword,
    },
  });

  return response.data;
};

export const createBook = async (book: Partial<Book>) => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (
  id: number,
  book: Partial<Book>,
) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const getBookHistory = async (id: number) => {
  const response = await api.get(`/books/${id}/history`);
  return response.data;
};

export const getAllBooks = async () => {
  const response = await api.get<Book[]>('/books/all');
  return response.data;
};