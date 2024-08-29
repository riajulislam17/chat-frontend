import React from "react";
import { MdPhoneInTalk } from "react-icons/md";

function ContentHeader({ username }: { username: string }) {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
  
  return (
    <>
      <div className="flex justify-between items-center gap-3 bg-violet-100 p-3 rounded">
        <div className="flex justify-start items-center gap-3">
          <p className="bg-gray-300 rounded-full p-3 border border-violet-900">
            {getInitials(username)}
          </p>
          <p>{username}</p>
        </div>
        <div className="flex justify-start items-center gap-3">
          <button
            className="bg-violet-200 border-violet-900 rounded-full p-3 border"
            //   disabled={!friendStatus}
          >
            <MdPhoneInTalk />
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentHeader;
