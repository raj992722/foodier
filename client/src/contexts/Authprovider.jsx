import React ,{createContext, useEffect, useState} from "react";

import {getAuth,signOut,onAuthStateChanged,updateProfile, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup} from 'firebase/auth';
import axios from "axios";

import app from '../config/firebase.config';



export const AuthContext=createContext();


const auth=getAuth(app);

const googleProvider=new GoogleAuthProvider();

const AuthProvider=({children})=>{
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);

    const create=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signUpWithGmail=()=>{
        return signInWithPopup(auth,googleProvider);
    }

    const logOut=()=>{
        localStorage.removeItem('access-token');
        return signOut(auth);
    }

    const updateUserProfile=(name,photoURL)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photoURL
        })
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            if(currentUser){
                const userInfo={emial:currentUser.email};
                axios.post('http://localhost:port/jwt',userInfo)
                .then(response=>{
                    if(response.data.token){
                        localStorage.setItem('access-token',response.data.token);
                    }
                })

            }
            setLoading(false);
        });

        return ()=>{
            return unsubscribe();
        }
    },[]);
    const authInfo={
        user,
        loading,
        create,
        signUpWithGmail,
        logOut,
        updateUserProfile,
        login
    }

    return (
        <AuthContext.Provider value={authInfo} >
        {children}
        </AuthContext.Provider>
    )
};



export default AuthProvider;