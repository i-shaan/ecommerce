import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader"
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
  
    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data);
      }
    }
  };


  return (
    <>
      <div className="flex">
        <div className="w-[65vw] bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] hidden lg:block "></div>

        <div className="w-[100vw] lg:w-[35vw] bg-gradient-to-br from-purple-500 to-pink-500 h-[100vh] flex flex-col items-center justify-center ">
          <form onSubmit={submitHandler} className=' flex flex-col justify-center items-center '>
            <div className="font-extrabold text-5xl text-teal-400 mb-[3rem]">Register</div>
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
                className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw]"
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
                className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] "
                placeholder="Enter username"
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
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
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-m font-medium text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-[50vw] lg:w-[20vw] "
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-gradient-to-br from-blue-500 to-green-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:to-green-900 transition duration-500 ease-in-out"
            >
              {isLoading ? "Registering.." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-green-400 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
