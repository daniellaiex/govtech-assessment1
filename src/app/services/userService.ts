import axios from 'axios';
import { User } from '../types/types';

export const fetchUsers = async (query: string = ''): Promise<User[]> => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
  
    if (query) {
      return users.filter(user =>
        user.username.toLowerCase().startsWith(query.toLowerCase())
      );
    }
  
    return users;
};