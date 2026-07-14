import api from '../api/axios';

export interface Reader {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReaderResponse {
  data: Reader[];
  total: number;
  page: number;
  limit: number;
}

export const getReaders = async (
  page = 1,
  limit = 10,
  keyword = '',
) => {
  const response = await api.get<ReaderResponse>(
    '/readers',
    {
      params: {
        page,
        limit,
        keyword,
      },
    },
  );

  return response.data;
};

export const createReader = async (
  reader: Partial<Reader>,
) => {
  const response = await api.post(
    '/readers',
    reader,
  );

  return response.data;
};

export const updateReader = async (
  id: number,
  reader: Partial<Reader>,
) => {
  const response = await api.put(
    `/readers/${id}`,
    reader,
  );

  return response.data;
};

export const deleteReader = async (
  id: number,
) => {
  const response = await api.delete(
    `/readers/${id}`,
  );

  return response.data;
};

export const getReaderHistory = async (
  id: number,
) => {
  const response = await api.get(
    `/readers/${id}/history`,
  );

  return response.data;
};

export const getAllReaders = async () => {
  const response = await api.get<Reader[]>('/readers/all');
  return response.data;
};