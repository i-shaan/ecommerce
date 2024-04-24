import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import Loader from '../Loader/loader'
import { toast } from "react-toastify";


// import { Toast } from 'react-toastify/dist/components'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state=>state.auth);
    const [login, { isLoading }] = useLoginMutation();
    const {search}= useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect')|| '/';
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[navigate,redirect,userInfo])
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ email, password }).unwrap();
          console.log(res);
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success('success')
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    
      return (
        <>
      <div className="flex">
        <div  className="w-[65vw] bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] hidden lg:block "></div>

        <div className="w-[100vw] lg:w-[35vw]  bg-gradient-to-br from-purple-500 to-pink-500 h-[100vh] flex flex-col items-center justify-center ">
          <form onSubmit={submitHandler} className=' flex flex-col justify-center items-center '>
            <div className="font-extrabold text-5xl text-teal-400 m-[3rem]">Sign In</div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-m font-medium text-black"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] "
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-m font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] "
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-gradient-to-br from-blue-500 to-green-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:to-green-900 transition duration-500 ease-in-out"
            >
              {isLoading ? "Signing.." : "Sign In"}
            </button>

            {/* {isLoading && <Loader />} */}
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-green-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>

        // </>
      );
    };
    
    export default Login;