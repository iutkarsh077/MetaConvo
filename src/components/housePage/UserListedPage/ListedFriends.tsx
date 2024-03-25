"use client";
import { Toaster, toast } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../ChatStyle.css";
import { useContext, useState } from "react";
import Image from "next/image";
import { UserContext } from "@/components/UserContext/DataContext";

interface Friend {
  name: string;
  avatar: string;
  About: string;
  _id: string;
  email: string;
}

const ListedFriends = ({ friendsData }: { friendsData: Friend[] }) => {
  // console.log(friendsData);
  const [singleUser, setSingleUser] = useState(false);
  const { setSingleUserChat, setSelectedToChat, singleUserChat } =
    useContext(UserContext);

  const handleSingleUserChat = async (friend: Friend) => {
    
    setSingleUser(true);
    setSelectedToChat(true);
    setSingleUserChat(friend);
    try {
      const res = await fetch("/api/Messages/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedToChat: singleUserChat._id,
        }),
      });
      const getAllMsg = await res.json();
      const getOnlyText = getAllMsg.getAllMessages;
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong, Try Again!", {
        position: "top-right",
        duration: 4000,
      });
    }
  };
  return (
    <div className="h-full overflow-y-scroll scrollbar">
      <Toaster />
      {friendsData && friendsData.length > 0 ? (
        friendsData.map((friend) => (
          <div
            key={friend._id}
            onClick={() => handleSingleUserChat(friend)}
            className="flex flex-row border-b-2 hover:cursor-pointer border-gray-400 justify-between items-center"
          >
            <div className="flex flex-row items-center">
              <img
                src={
                  friend.avatar ? friend.avatar : friend.name[0].toUpperCase()
                }
                alt={friend.name[0].toUpperCase()}
                className="w-20 h-20 rounded-full p-2"
              />
              <div className="ml-2">
                <h1 className="text-md font-semibold">{friend.name}</h1>
              </div>
            </div>
            <div className="mr-6 text-xl">
              <BsThreeDotsVertical className="font-bold hover:cursor-pointer" />
            </div>
          </div>
        ))
      ) : (
        <p>No friends to display</p>
      )}
    </div>
  );
};

export default ListedFriends;
