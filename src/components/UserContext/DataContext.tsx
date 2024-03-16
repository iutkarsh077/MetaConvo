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
}

export const UserContext = createContext<UserContextType>({
  singleUserChat: {} as Friend,
  setSingleUserChat: () => {},
  selectedToChat: false,
  setSelectedToChat: () => {},
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [singleUserChat, setSingleUserChat] = useState<Friend>({} as Friend);
  const [selectedToChat, setSelectedToChat] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        setSingleUserChat,
        singleUserChat,
        selectedToChat,
        setSelectedToChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default GlobalContextProvider;
