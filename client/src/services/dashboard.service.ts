import api from '../api/axios';

export interface DashboardData {
  totalBooks: number;
  totalReaders: number;
  totalBorrowRecords: number;
  borrowing: number;
  returned: number;
  availableBooks: number;
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get('/dashboard');
  return response.data;
};