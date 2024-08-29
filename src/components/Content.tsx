import React from "react";
import { BiUserPlus } from "react-icons/bi";
import { MdPhoneInTalk } from "react-icons/md";
import ContentHeader from "./ContentHeader";
import RequestContent from "./RequestContent";
import SentRequestContent from "./SentRequestContent";
import FriendContent from "./FriendContent";

interface Props {
  selectedUser: any;
  activeTab: string;
}

function Content({ selectedUser, activeTab }: Props) {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
  return (
    <>
          <div className="sticky"><ContentHeader username={selectedUser?.friendInfo?.name} /></div>
      {activeTab === "friend" && (
        <>
          <FriendContent selectedUser={selectedUser} />
        </>
      )}

      {activeTab === "receive" && selectedUser && (
        <>
          <ContentHeader username={selectedUser?.senderInfo?.name} />
          <RequestContent selectedUser={selectedUser} />
        </>
      )}
      {activeTab === "sent" && (
        <>
          <ContentHeader username={selectedUser?.receiverInfo?.name} />
          <SentRequestContent selectedUser={selectedUser} />
        </>
      )}
    </>
  );
}

export default Content;
