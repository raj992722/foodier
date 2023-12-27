import React,{useState} from "react";

import useAuth from "../hooks/useAuth";

import { useLocation,useNavigate,Link } from "react-router-dom";


import useAxiosPublic from "../hooks/useAxiosPublic";

import {useForm} from 'react-hook-form';



const Login=()=>{
    const [errorMessage,setErrorMessage]=useState('');

    const {login,signUpWithGmail}=useAuth();

    const axiosPublic=useAxiosPublic();

    const navigate=useNavigate();

    const location=useLocation();

    const form=location.state?.form?.pathname || '/';

    const {register,handleSubmit,formState:{errors},reset}=useForm();


    const onSubmit=(data)=>{
        const email=data.email;
        const password=data.password;
        login(email,password).then(result=>{
            const user=result.user;
            const userInfo={
                name:data.name,
                email:data.email
            };
            axiosPublic.post('/users',userInfo).then(response=>{
                alert('sigin successfull');
                navigate(from,{replace:true});
            })
        }).catch(error=>{
            console.log(error.message);
            setErrorMessage('Pls provide valid email and password');
        })

        reset();
    };

    const handleRegister=()=>{
        signUpWithGmail()
        .then(result=>{
            const user=result.user;
            const userInfo={
                name:result?.user?.displayName,
                email:result?.user?.email
            };
            axiosPublic.post('/users',userInfo)
            .then(response=>{
                console.log('sigin successfully');
                navigate('/');
            })
        })
        .catch(error=>{
            console.log(error)
        })
    };

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    <div className="mb-5">
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>

            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
    <div className="text-center space-x-3">
        <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
          <FaGoogle />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub />
        </button>
      </div>
    </div>
  </div>
    )


}

export default Login;