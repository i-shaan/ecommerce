import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  useEffect(() => {
    setusername(userInfo.username);
    setemail(userInfo.email);
  }, [userInfo.email, userInfo.username]);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({_id: userInfo._id, username, email, password,}).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile Updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  
  return (
    <>
      <div className="bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] flex flex-col justify-center items-center">
        <div className="font-extrabold text-3xl text-[#FFF6E9] mb-[3rem] ">
          Update Profile
        </div>
        <form onSubmit={submitHandler} className="flex flex-col ">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-m font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] bg-blue-200"
              placeholder="Enter username"
              value={username}
              required
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
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
              className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] bg-blue-200 "
              placeholder="Enter username"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              
              className="block text-m font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] bg-blue-200 "
              placeholder="Enter password"
              value={password}

              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
             
              className="block text-m font-medium text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] bg-blue-200 "
              placeholder="Confirm Password"
              value={confirmPassword}
        
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
          <button 
            
            type="submit"
            className="bg-[#FFFFDD] text-black rounded cursor-pointer  hover:bg-green-900 hover:text-white transition duration-500 ease-in-out w-[7rem] h-[2rem]"
          >Update</button>
          <Link
            to="/user-orders"
            className="bg-[#FFFFDD] text-black  rounded cursor-pointer pl-[1.2rem] pt-[0.25rem] hover:bg-green-900 hover:text-white transition duration-500 ease-in-out w-[7rem] h-[2rem]"
          >My Orders</Link>
          </div>

        </form>
      </div>
    </>
  );
};

export default Profile;
