"use client";
import React, { useContext } from "react";
import { DarkMode } from "../uimodes/darkMode";
import { UserContext } from "../UserContext/DataContext";
import { GrLogout } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
const Navbar = () => {
  const router = useRouter();
  const { isLoggedInClient, setIsLoggedInClient } = useContext(UserContext);

  const handleLogOut = async () =>{
      try {
        const res = await fetch('api/auth/logout', {
          method: 'DELETE'
        })
        const data = await res.json();
        router.push('/Login');
        setIsLoggedInClient(false);
        toast.success("Logged Out Successfully", {
          position: "top-right",
          duration: 3000
        })
      } catch (error) {
        console.log(error);
        toast.error("LogOut Failed", {
          position: "top-right",
          duration: 3000
        })
      }
  }
  return (
    <div className="h-20 w-screen bg-blue-500 flex justify-between fixed top-0 items-center">
      <Toaster/>
      <p className="pl-2 sm:text-2xl text-lg font-semibold opacity-60">
        MetaConvo
      </p>
      <div className="flex w-1/4 gap-x-4 items-center justify-end">
        <p className="pr-2">
          <DarkMode />
        </p>
        <div>{isLoggedInClient ? <div onClick={handleLogOut} className="rounded-lg hover:cursor-pointer text-3xl"><GrLogout /></div> : <div></div>}</div>
      </div>
    </div>
  );
};

export default Navbar;
