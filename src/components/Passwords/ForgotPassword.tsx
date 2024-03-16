"use client";
import Sendit from "@/lib/SendIt";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import VerifyEmailForPassword from "./VerifyEmailForPassword";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
    const [otpsent, setOtpSent] = useState(false);
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const val = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let otp = "";
      for (let i = 0; i < 6; i++) {
        let otpIndex = Math.floor(Math.random() * val.length);
        otp = otpIndex + otp;
      }
      setotp(otp);
      Sendit({ to: email, name:"user", subject: "Verify Email For Forgot Password", body: otp });
      setOtpSent(true);
      toast.success("OTP sent to your email", {
        duration: 4000,
        position: "top-right",
      })
    } catch (error) {
      toast.error("Error in sending OTP", {
        duration: 2000,
        position: "top-right",
      })
      // console.log(error);
    }
  };
  if(otpsent){
    return <VerifyEmailForPassword myotp={otp} email={email}/>
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-md">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
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
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <Link href={"/Signup"} className="text-blue-600">
            Back to Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
