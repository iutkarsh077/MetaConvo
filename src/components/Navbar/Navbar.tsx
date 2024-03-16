"use client";
import React from "react";
import { DarkMode } from "../uimodes/darkMode";
const Navbar = () => {
   
    return (
        <div className="h-20 w-screen bg-blue-500 flex justify-between fixed top-0 items-center">
            <p className="pl-2 sm:text-2xl text-lg font-semibold opacity-60">MetaConvo</p>
            <p className="pr-2"><DarkMode/></p>
        </div>
    );
};

export default Navbar;
