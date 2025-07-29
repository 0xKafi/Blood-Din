import axios from 'axios';

const useAxiosPublic = () => {

    const instance = axios.create({
        baseURL: "https://blood-din-server.vercel.app",
    })
    return instance;
};

export default useAxiosPublic;