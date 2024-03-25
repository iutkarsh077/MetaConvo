"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Friend {
  name: string;
  avatar: string;
  About: string;
  _id: string;
  email: string;
}

interface User {
  _id: string;
  name: string;
  avatar: string;
  About: string;
  email: string;
}

interface UserContextType {
  singleUserChat: Friend;
  setSingleUserChat: React.Dispatch<React.SetStateAction<Friend>>;
  selectedToChat: boolean;
  setSelectedToChat: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedInClient: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedInClient: boolean;
  setSenderId: React.Dispatch<React.SetStateAction<User | undefined>>;
  senderId: User | undefined;
}

export const UserContext = createContext<UserContextType>({
  singleUserChat: {} as Friend,
  setSingleUserChat: () => {},
  selectedToChat: false,
  setSelectedToChat: () => {},
  setIsLoggedInClient: () => {},
  isLoggedInClient: false,
  setSenderId: () => {},
  senderId: undefined,
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [singleUserChat, setSingleUserChat] = useState<Friend>({} as Friend);
  const [selectedToChat, setSelectedToChat] = useState<boolean>(false);
  const [isLoggedInClient, setIsLoggedInClient] = useState<boolean>(false);
  const [senderId, setSenderId] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/UserDetails',{
          method: 'GET',
        })
        const data = await res.json();
        if(data){
          setIsLoggedInClient(true);
          setSenderId(data.UserDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  console.log(senderId)
  return (
    <UserContext.Provider
      value={{
        setSingleUserChat,
        singleUserChat,
        selectedToChat,
        setSelectedToChat,
        setIsLoggedInClient,
        isLoggedInClient,
        setSenderId,
        senderId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default GlobalContextProvider;
