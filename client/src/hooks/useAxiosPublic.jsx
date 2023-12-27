import axios from "axios";

const serverPort=3000;




const axiosPublic=axios.create({
    baseURL:`http://localhost:${serverPort}`
});

const useAxiosPublic=()=>{
    return axiosPublic;
}


export default useAxiosPublic;