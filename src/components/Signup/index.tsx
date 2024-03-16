"use client";
import React, { useState } from "react";
import Link from "next/link";
import VerifyEmail from "../VerifyEmail";
import Sendit from "@/lib/SendIt";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handleSignUpForOTP, setHandleSignUpForOTP] = useState(false);
  let [otp, setOtp] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const val = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let otp = "";
      for (let i = 0; i < 6; i++) {
        let otpIndex = Math.floor(Math.random() * val.length);
        otp = otpIndex + otp;
      }
      setOtp(otp);
      setHandleSignUpForOTP(true);
      Sendit({ to: email, name, subject: "Verify Email", body: otp });
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log(handleSignUpForOTP);
  if (handleSignUpForOTP) {
    return <VerifyEmail myotp={otp} name={name} email={email} />;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <Link href={"/Login"} className="text-blue-600">
            Already an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
