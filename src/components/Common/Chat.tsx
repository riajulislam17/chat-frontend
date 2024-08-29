import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";
import FriendRequestList from "../FriendRequestList";
import FriendList from "../FriendList";
import SentRequestList from "../SentRequestList";
import Content from "../Content";
import DefaultScreen from "../DefaultScreen";

function Chat() {
  const [activeTab, setActiveTab] = useState<string>("friend");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setSelectedUser(null);
  }, [activeTab]);

  return (
    <>
      <div className="h-screen flex justify-between gap-2 my-5">
        {/* tabs column */}
        <div className="w-3/12 border border-indigo-500 rounded overflow-y-auto p-3">
          <div className="w-full px-1 mb-5 flex justify-between items-center gap-3">
            <input
              className="border border-gray-300 w-full py-2 px-3 rounded-sm"
              type="text"
              placeholder="Search with User Email"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {searchText ? (
            <div className="w-full px-1 mb-5 flex justify-between items-center gap-3">
              {/* <p>{user?.name}</p>{" "} */}
              Search Info
            </div>
          ) : (
            <div>
              <Tabs setActiveTab={setActiveTab} />
              {activeTab === "friend" && (
                <FriendList
                  onSelect={(user) => {
                    setSelectedUser(user);
                  }}
                />
              )}
              {activeTab === "receive" && (
                <FriendRequestList
                  onSelect={(user) => {
                    setSelectedUser(user);
                  }}
                />
              )}
              {activeTab === "sent" && (
                <SentRequestList
                  onSelect={(user) => {
                    setSelectedUser(user);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* content column */}
        <div className="w-9/12 border border-indigo-500 rounded overflow-y-auto p-3">
          {selectedUser ? (
            <Content selectedUser={selectedUser} activeTab={activeTab} />
          ) : (
            <DefaultScreen />
          )}
        </div>
      </div>


    </>
  );
}

export default Chat;
