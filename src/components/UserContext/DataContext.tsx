"use client";
import { createContext, ReactNode, useState } from "react";

interface Friend {
  name: string;
  avatar: string;
  About: string;
  _id: string;
  email: string;
}

interface UserContextType {
  singleUserChat: Friend;
  setSingleUserChat: (friend: Friend) => void;
  selectedToChat: boolean;
  setSelectedToChat: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedInClient: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedInClient: boolean
}

export const UserContext = createContext<UserContextType>({
  singleUserChat: {} as Friend,
  setSingleUserChat: () => {},
  selectedToChat: false,
  setSelectedToChat: () => {},
  setIsLoggedInClient: ()=> {},
  isLoggedInClient: false
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [singleUserChat, setSingleUserChat] = useState<Friend>({} as Friend);
  const [selectedToChat, setSelectedToChat] = useState<boolean>(false);
  const [isLoggedInClient, setIsLoggedInClient] = useState<boolean>(false);
  console.log(isLoggedInClient);
  return (
    <UserContext.Provider
      value={{
        setSingleUserChat,
        singleUserChat,
        selectedToChat,
        setSelectedToChat,
        setIsLoggedInClient,
        isLoggedInClient
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default GlobalContextProvider;
