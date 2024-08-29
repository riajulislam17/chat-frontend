import { handleResource } from "@/utils/APIRequester";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
  selectedUser: any;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
}

interface Messages {
  sentMessages: Message[];
  receivedMessages: Message[];
}

const FriendContent: React.FC<Props> = ({ selectedUser }) => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Messages>({
    sentMessages: [],
    receivedMessages: [],
  });
  
  const userId = useSelector((state: RootState) => state.userData.id);

  const getList = async () => {
    try {
      const result = await handleResource({
        method: "get",
        endpoint: `messages/${selectedUser.friendInfo.id}`,
        popMessage: false,
      });
      setMessages(result);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getList();
    }
  }, [selectedUser]);

  const allMessages = [...messages.sentMessages, ...messages.receivedMessages];
  allMessages.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  
  // console.log("selectedUser", selectedUser);
  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      receiverId: selectedUser.friendInfo.id,
      content: text,
    };
    try {
      const result = await handleResource({
        method: "post",
        endpoint: "messages",
        data: payload,
        isMultipart: false,
        popMessage: false,
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4 ">
      {allMessages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender_id === +userId ? "justify-end" : "justify-start"
          }`}
        >
          <div className="w-2/3">
            <p
              className={`text-xs text-gray-500 my-1 ${
                msg.sender_id === +userId ? "text-end" : "text-start"
              }`}
            >
              {new Date(msg.created_at).toLocaleTimeString()}
            </p>
            <div
              className={`p-3 rounded-xl text-gray-900 ${
                msg.sender_id === +userId ? "bg-gray-300" : " bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        </div>
      ))}

      <form
        onSubmit={handleMessageSend}
        className="w-full bg-white py-4 flex items-center gap-3"
      >
        <input
          type="text"
          className="bg-gray-50 border-2 border-indigo-700 rounded-md p-3 flex-grow"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-gray-50 border-2 border-indigo-700 px-8 py-3 rounded-md"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FriendContent;
