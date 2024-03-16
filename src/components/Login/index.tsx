"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ForgotPassword from "../Passwords/ForgotPassword";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);

    if (email === "" || password === "") {
      toast.error("Please fill all the fields", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    try {
      const res = await fetch("/api/auth/loginapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        router.push("/");
        toast.success(data.msg, {
          position: "top-right",
          duration: 3000,
        });
      } else {
        toast.error(data.msg, {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Invalid Credentials", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/Login");
    }
    setEmail("");
    setPassword("");
  };

  if(forgotPassword){
    return <ForgotPassword/>
  }
  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 rounded-md">
        <Toaster />
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="border p-2 rounded-lg w-full"
            />
            <div className="flex justify-between gap-x-2 pt-3">
              <div>
                <label htmlFor="ShowPassword" className="text-gray-400">
                  {showPassword ? "Hide Password" : "Show Password"}
                </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => setShowPassword(!showPassword)}
                />
              </div>
              <div onClick={()=>setForgotPassword(true)} className="text-gray-700 hover:cursor-pointer hover:text-white ease-in-out">Forgot Password?</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
            <Link href={"/Signup"} className="text-blue-600">
              Does not have an Account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
