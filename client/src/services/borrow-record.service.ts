import api from '../api/axios';

export interface BorrowRecord {
  id: number;

  borrowDate: string;

  dueDate: string;

  returnDate?: string;

  status: string;

  book: {
    id: number;
    title: string;
  };

  reader: {
    id: number;
    fullName: string;
  };
}

export interface BorrowResponse {
  data: BorrowRecord[];
  total: number;
  page: number;
  limit: number;
}

export const getBorrowRecords = async (
  page = 1,
  limit = 10,
  status = '',
) => {
  const response = await api.get<BorrowResponse>(
    '/borrow-records',
    {
      params: {
        page,
        limit,
        status,
      },
    },
  );

  return response.data;
};

export const createBorrowRecord = async (
  data: any,
) => {
  const response = await api.post(
    '/borrow-records',
    data,
  );

  return response.data;
};

export const returnBook = async (
  id: number,
) => {
  const response = await api.patch(
    `/borrow-records/${id}/return`,
  );

  return response.data;
};

export const deleteBorrowRecord = async (
  id: number,
) => {
  const response = await api.delete(
    `/borrow-records/${id}`,
  );

  return response.data;
};