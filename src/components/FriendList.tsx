import { handleResource } from "@/utils/APIRequester";
import React, { useEffect, useState } from "react";

interface Friends {
  friendshipInfo: FriendshipInfo;
  friendInfo: FriendInfo;
}
interface FriendInfo {
  id: number;
  name: string;
  email: string;
}
interface FriendshipInfo {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: string;
}

const FriendList: React.FC<{
  onSelect: (user: Friends) => void;
}> = ({ onSelect }) => {
  const [friendList, setFriendList] = useState<Friends[]>([]);

  const getList = async () => {
    try {
      const result = await handleResource({
        method: "get",
        endpoint: `friends/friend-list`,
        popMessage: false,
      });
      setFriendList(result);
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
        {friendList.map((user) => (
          <li
            key={user.friendInfo.id}
            className="flex justify-around items-center gap-3 my-2 cursor-pointer"
            onClick={() => onSelect(user)}
          >
            <p className="bg-gray-300 rounded-full py-1 px-3">
              {getInitials(user.friendInfo.name)}
            </p>
            <p>{user.friendInfo.name} ({user.friendInfo.email})</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FriendList;
