import { useQuery } from "@tanstack/react-query";


// import autoprefixer from "autoprefixer";
import useAuth from "./useAuth";




const useCart=()=>{
    const {user}=useAuth();
    const token=localStorage.getItem('access-token');
    const {data:cart=[],refetch}=useQuery({
        queryKey:['cart',user?.email],
        queryFn:async ()=>{
            const res=await fetch(`http://loocalhost:port/carts?email=${user?.email}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            });
            return res.json();

        }
    });
    return [cart,refetch];
}

export default useCart;