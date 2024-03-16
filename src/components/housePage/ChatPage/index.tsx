"use client";

import { UserContext } from "@/components/UserContext/DataContext";
import { useContext, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

const ChatPage = () => {
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { singleUserChat, selectedToChat } = useContext(UserContext);
  const [UserMessage, setUserMessage] = useState("");

/*  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);*/


  if (!selectedToChat)
    return (
      <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-gray-600">
        Select your Friend To Chat!
      </div>
    );
  return (
    <div>
      <div className="flex w-full fixed bottom-0 overflow-hidden flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          className="mb-1"
          value={UserMessage}
          onChange={(e)=>setUserMessage(e.target.value)}
          placeholder={`Let's Talk with ${singleUserChat.name}`}
        />
      </div>
    </div>
  );
};

export default ChatPage;
