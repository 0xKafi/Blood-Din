import { useContext, useMemo } from 'react';
import AuthContext from '../Auth/AuthContext';
import axios from 'axios';

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const instance = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
  }, [user?.accessToken]);

  return instance;
};

export default useAxiosSecure;
