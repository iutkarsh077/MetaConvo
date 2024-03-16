"use client";
import RedLoadingCircle from "@/utils/Loader";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ListedFriends from "./ListedFriends";

interface Friend {
  name: string;
  avatar: string;
  About: string;
  _id: string;
  email: string;
}

const FriendListedPage = () => {
  const [friendsData, setFriendsData] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        
        const res = await fetch("api/userFriendList", { method: "GET" });
        const data = await res.json();
        // console.log(data);
        setFriendsData(data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
        toast.error("Error Fetching Friends List", {
          duration: 3000,
          position: "top-right",
        });
        setLoading(false); 
      }
    };
    fetchFriends();
  }, []);

  if(loading) return <RedLoadingCircle/>
  return (  
    <div className="fixed top-20 left-0 sm:w-1/3 w-full h-full overflow-y-auto">
      <ListedFriends friendsData={friendsData}/>
    </div>
  );
};

export default FriendListedPage;
