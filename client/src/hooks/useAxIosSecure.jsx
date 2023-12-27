import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';



const axiosSecure=axios.create({
    baseURL:'http://localhost:port'
});


const useAxiosSecure=()=>{
    const {logOut} =useAuth();
    const navigate=useNavigate();
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token');
        config.headers.Authorization=`Bearer ${token}`;
        return config;
    },(error)=>{
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async (error)=>{
        const status=error.response.status;
        if(status===401 || status===403){
            await logOut();
            navigate('/login')

        }
        return Promise.reject(error);
    })

    return axiosSecure;
}

export default useAxiosSecure;