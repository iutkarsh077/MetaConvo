"use client";
import { UserContext } from "@/components/UserContext/DataContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import "../ChatStyle.css";
import { uniqBy } from "lodash";

const ChatPage = () => {
  const { singleUserChat, selectedToChat, senderId } = useContext(UserContext);
  console.log(singleUserChat);
  console.log(senderId)
  const [newMessage, setNewMessage] = useState<string>("");
  const divUnderMessages = useRef<HTMLDivElement>(null);
  const [receivedMsgs, setReceivedMsgs] = useState<
    { text: string; sender?: string; recipient?: string; _id: number }[]
  >([]); // Updated type of receivedMsgs
  const [onlinePeople, setOnlinePeople] = useState<{
    [userId: string]: string;
  }>({});
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({behavior:'smooth', block:'end'});
    }
  }, [receivedMsgs]);

  function showOnlineUsers(
    onlineUsers: { userId: string; username: string }[]
  ) {
    const people: { [userId: string]: string } = {};
    onlineUsers.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    console.log(people);
    setOnlinePeople(people);
  }

  const handleReceiveMsg = (e: MessageEvent<any>) => {
    console.log(e);
    const messageData = JSON.parse(e.data);
    console.log(messageData);
    if ("online" in messageData) {
      showOnlineUsers(messageData.online);
    } else if ("text" in messageData) {
      setReceivedMsgs((prev) => [...prev, { ...messageData }]);
    }
  };

  async function connectToWs() {
    const ws = new WebSocket('ws://localhost:5000');
    setWs(ws);
    ws.addEventListener('message', handleReceiveMsg);
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect.');
        connectToWs();
      }, 1000);
    });
  }

  useEffect(() => {
    connectToWs();
  }, []);


  useEffect(() => {
   try {
    if (singleUserChat) {
      const getAllMessages = async () => {
        const res = await fetch("/api/Messages/getMessages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(singleUserChat),
        });
        const data = await res.json();
        setReceivedMsgs(data.getAllMessages);
        console.log(data);
      };
      getAllMessages();
    }
   } catch (error) {
    console.log(error);
   }
  }, [singleUserChat]);

  const handleSendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ws?.send(
      JSON.stringify({
        message: {
          recipient: singleUserChat?._id,
          text: newMessage,
        },
      })
    );
    setNewMessage("");
    console.log("Sender is: ", senderId?._id);
    setReceivedMsgs((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: senderId?._id, 
        recipient: singleUserChat?._id,
        _id: Date.now(),
      },
    ]);
  };
  if (!selectedToChat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-400">Select a user to chat</h1>
      </div>
    );
  }

  const messageWithoutDupes = uniqBy(receivedMsgs, "_id");

  return (
    <div className="h-screen">
      <div className="overflow-y-scroll h-4/5 scrollbar">
      <div className="relative scrollbar pt-2">
        {messageWithoutDupes.map((msg, index) => (
          <div
          key={msg._id}
          className={
            msg.sender === senderId?._id
            ? "text-right w-full"
            : "text-left w-full"
          }
          >
            <div
              className={
                "inline-block p-2 my-2 rounded-xl text-sm" +
                (msg.sender === senderId?._id
                  ? " bg-blue-500 text-white rounded-br-none"
                  : " bg-gray-400 text-black rounded-bl-none font-semibold")
              }
            >
              {msg.text}
            </div>
            <div ref={divUnderMessages}></div>
          </div>
        ))}
      </div>
      </div>

      <div className="flex w-full fixed bottom-0 overflow-hidden flex-wrap md:flex-nowrap gap-4 flex-col">
        <div className="w-2/3 flex flex-col fixed bottom-2">
          <form className="flex items-center" onSubmit={handleSendMsg}>
            <Input
              type="text"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Let's Talk with ${singleUserChat?.name}`} // Access name safely
            />

            <button
              type="submit"
              className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;