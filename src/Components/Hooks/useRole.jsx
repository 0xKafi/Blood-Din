import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const [role, setRole] = useState("");
  const [loading, setloading] = useState(true)
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure('/get-user-role').then((res) => {
        setRole(res.data?.role);
        setloading(false)
    });
  }, []);
  return {role, loading}
};
export default useRole;