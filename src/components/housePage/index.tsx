"use client";

import ChatPage from "./ChatPage";
import FriendListedPage from "./UserListedPage";
const MainPage = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden justify-between">
    <div className="sm:w-1/3 w-full border-r-2 border-gray-600 h-full relative top-20">
      <FriendListedPage />
    </div>
  
   
    <div className="hidden sm:block right-0 sm:w-2/3 h-full sticky top-20">
      <ChatPage />
    </div>
  </div>
  

  )
}

export default MainPage
