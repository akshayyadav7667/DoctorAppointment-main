import { Link, Navigate, useNavigate } from "react-router-dom";
import login1 from "../assets/login1.svg";
import login2 from "../assets/login2.svg";
import login3 from "../assets/login3.svg";
import login4 from "../assets/login4.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import toast from "react-hot-toast";




export default function Login() {

  const {backendUrl,setUserToken,setUser}= useContext(AuthContext)

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate= useNavigate();


  const handleSubmitLogin= async(e)=>{
    e.preventDefault();

    // console.log(email,password)

    try {
       const response = await axios.post(backendUrl+'/api/user/login',{
        email,
        password
       })
       
       if(response.data.success===true)
       {
        // console.log(response.data.user)
          localStorage.setItem("userToken",response.data.token)
          setUserToken(response.data.token);
          setUser(response.data.user)
          toast.success(response.data.message)
          setEmail("");
          setPassword("");

          // console.log(response.data.user);

          navigate(`/${response.data.user.role}`)
          // Navigate('/user')
          // window.location.href="/user"
       }
       
      //  console.log(response)
    } catch (error) {
      // console.log(error.response)
      toast.error(error?.response?.data?.message || "Something went wrong");
      // toast.error(error.response.data.message)
    }
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col-reverse lg:flex-row  md:gap-8 h-full">
        {/* bottom Side - Image */}
        <div className=" flex flex-col flex-1 justify-center items-center bg-[#d2d9ff]">
          <h3 className="text-xl mr-[35px] text-gray-800 font-medium mb-5">
            Get access to everything WebMD offers
          </h3>
          <ul className="space-y-4 flex flex-col justify-center">
            <li className="flex items-center gap-2">
              {" "}
              <span className="bg-[#7c8ffb] p-2 rounded-full">
                <img
                  src={login1}
                  className=" bg-blue-800 rounded-full  w-7 h-7"
                />
              </span>{" "}
              Personalized tools for managing your health
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <span className="bg-[#7c8ffb] p-2 rounded-full">
                <img
                  src={login2}
                  alt=""
                  className=" rounded-full bg-blue-800   w-7 h-7"
                />
              </span>{" "}
              Health and wellness updates delivered to your inbox
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <span className="bg-[#7c8ffb] p-2 rounded-full">
                <img
                  src={login3}
                  alt=""
                  className=" rounded-full bg-blue-800   w-7 h-7"
                />
              </span>{" "}
              Saved articles, conditions and medications
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <span className="bg-[#7c8ffb] p-2 rounded-full">
                <img
                  src={login4}
                  alt=""
                  className=" rounded-full bg-blue-800   w-7 h-7"
                />
              </span>{" "}
              Expert insights and patient stories
            </li>
          </ul>
        </div>

        {/* top Side - Login Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white p-8 w-[24rem] md:w-[30rem]  rounded-lg">
            <h2 className="text-[#E44400] text-4xl  font-semibold text-center mb-6">
              Login Here
            </h2>

            <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmitLogin}>
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md font-medium hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            {/* Register Link */}
            <p className="text-sm text-gray-700 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
