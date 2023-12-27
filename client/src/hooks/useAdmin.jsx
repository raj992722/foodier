import React from "react";

import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxIosSecure";

const useAdmin=()=>{
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:isAdmin,isPending:isAdminLoading,refetch}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.isAdmin;
        }
    })
    return [isAdmin,isAdminLoading];
}

export default useAdmin;