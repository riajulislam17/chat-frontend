import { handleResource } from "@/utils/APIRequester";
import React, { useEffect, useState } from "react";

interface FriendRequest {
  friendInfo: FriendInfo;
  senderInfo: SenderInfo;
}
interface SenderInfo {
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

const FriendRequestList: React.FC<{
  onSelect: (user: FriendRequest) => void;
}> = ({ onSelect }) => {
  const [requestList, setRequestList] = useState<FriendRequest[]>([]);

  const getList = async () => {
    try {
      const result = await handleResource({
        method: "get",
        endpoint: `friends/request-list`,
        popMessage: false,
      });
      setRequestList(result);
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
        {requestList.map((user) => (
          <li
            key={user.friendInfo.id}
            className="flex justify-start items-center gap-3 my-2 cursor-pointer"
            onClick={() => onSelect(user)}
          >
            <p className="bg-gray-300 rounded-full py-1 px-3">
              {getInitials(user.senderInfo.name)}
            </p>
            <p>
              {user.senderInfo.name} ({user.senderInfo.email})
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FriendRequestList;
