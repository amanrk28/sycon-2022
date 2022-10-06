import { Signup } from './types';
import axios from 'axios';
import { ApiRoutes } from 'components/types';

type CreateUser = Omit<Signup, 'confirmPassword' | 'password'> & {
  uid: string;
};

export const createUser = (userData: CreateUser) => {
  return axios({
    baseURL: window.location.origin,
    method: 'POST',
    url: ApiRoutes.User,
    data: userData,
  });
};

export const getUser = (uid: string) => {
  return axios({
    baseURL: window.location.origin,
    method: 'GET',
    url: `${ApiRoutes.User}?uid=${uid}`,
  });
};
