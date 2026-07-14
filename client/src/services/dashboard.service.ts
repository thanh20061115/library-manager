import api from '../api/axios';

export interface DashboardStatistics {
  totalBooks: number;
  totalReaders: number;
  totalBorrowRecords: number;
  borrowing: number;
  returned: number;
  availableBooks: number;
}

export async function getDashboardStatistics() {
  const response =
    await api.get<DashboardStatistics>('/dashboard');

  return response.data;
}