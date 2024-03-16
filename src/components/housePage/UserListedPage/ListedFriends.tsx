"use client";
import { Toaster, toast } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import '../ChatStyle.css'
import { useContext, useState } from "react";
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
   const {setSingleUserChat, setSelectedToChat} = useContext(UserContext);
    
   const handleSingleUserChat = (friend:Friend) =>{
    setSingleUser(true);
    setSelectedToChat(true);
    setSingleUserChat(friend);
   }
  return (
    <div className="h-full overflow-y-scroll scrollbar">
      <Toaster />
      {friendsData && friendsData.length > 0 ? (
        friendsData.map((friend) => (
          <div key={friend._id} onClick={()=>handleSingleUserChat(friend)} className="flex flex-row border-b-2 hover:cursor-pointer border-gray-400 justify-between items-center">
            <div className="flex flex-row items-center">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-20 h-20 rounded-full p-2"
              />
              <div className="ml-2">
                <h1 className="text-md font-semibold">{friend.name}</h1>
              </div>
            </div>
              <div className="mr-6 text-xl">
              <BsThreeDotsVertical className="font-bold hover:cursor-pointer"/>
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
