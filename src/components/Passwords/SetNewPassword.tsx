"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const SetNewPassword = ({ email }: { email: string }) => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUserCreate = async () => {
    try {
      const res = await fetch("api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        router.push("/Login");
      }
      if(!data.success){
        toast.success(data.msg, {
          duration: 2000,
          position: "top-right",
        });
        router.push('/Signup');
      }
    } catch (error) {
      toast.error("Password Update Failed, Try again", {
        duration: 2000,
        position: "top-right",
      });
      router.push("/Signup");
    }
  };

  return (
    <div>
      <div className="max-h-screen mt-10 flex flex-col overflow-hidden items-center justify-center">
        <Toaster />
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center  border-2 m-7 rounded-md justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight  sm:text-4xl">
                  Password
                </h2>

                <form action="#" method="POST" className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-medium text-base"
                    >
                      Set Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Set a Strong Password"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleUserCreate}
                      className="w-full inline-flex items-center justify-center px-3.5 py-2.5 font-semibold leading-7 text-white bg-black rounded-md hover:bg-black"
                    >
                      Verify OTP <FaArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SetNewPassword;
