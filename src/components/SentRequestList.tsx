import { handleResource } from "@/utils/APIRequester";
import React, { useEffect, useState } from "react";

interface SentRequest {
  friendInfo: FriendInfo;
  receiverInfo: ReceiverInfo;
}
interface ReceiverInfo {
  id: number;
  name: string;
  email: string;
}
interface FriendInfo {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: string;
}

const SentRequestList: React.FC<{
  onSelect: (user: SentRequest) => void;
}> = ({ onSelect }) => {
  const [sentRequestList, setSentRequestList] = useState<SentRequest[]>([]);

  const getList = async () => {
    try {
      const result = await handleResource({
        method: "get",
        endpoint: `friends/sent-list`,
        popMessage: false,
      });
      setSentRequestList(result);
    } catch (error) {}
  };

  useEffect(() => {
    getList();
  }, []);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
  return (
    <>
      <ul>
        {sentRequestList.map((user) => (
          <li
            key={user.receiverInfo.id}
            className="flex justify-start items-center gap-3 my-2 cursor-pointer"
            onClick={() => onSelect(user)}
          >
            <p className="bg-gray-300 rounded-full py-1 px-3">
              {getInitials(user.receiverInfo.name)}
            </p>
            <p>
              {user.receiverInfo.name} ({user.receiverInfo.email})
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SentRequestList;
