import api from '../api/axios';

export interface LoginDto {
  username: string;
  password: string;
}

export const login = async (data: LoginDto) => {
  const response = await api.post('/auth/login', data);

  return response.data;
};