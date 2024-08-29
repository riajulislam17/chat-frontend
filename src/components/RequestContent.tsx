import { handleResource } from "@/utils/APIRequester";
import React, { useEffect, useState } from "react";

interface Props {
  selectedUser: any;
}

function RequestContent({ selectedUser }: Props) {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleStatusUpdate = async (status: "accepted" | "rejected") => {
    const payload = {
      sender_id: selectedUser?.senderInfo?.id,
      status: status,
    };

    if (selectedUser && status) {
      const result = await handleResource({
        method: "patch",
        endpoint: `friends`,
        data: payload,
        popMessage: true,
        popText: `Friend Request ${status}!`,
      });
    }
  };

  return (
    <>
      {" "}
      <div className="flex justify-center items-center min-h-screen gap-3">
        <div>
          <p className="text-9xl rounded-full bg-gray-200 p-12 text-center">
            {getInitials(selectedUser?.senderInfo?.name)}
          </p>
          <p className="text-2xl font-semibold text-center my-5">
            {selectedUser?.senderInfo?.name}
          </p>
          <p className="text-xl font-semibold text-center my-5">
            {selectedUser?.senderInfo?.email}
          </p>
          <div className="flex justify-center items-center gap-3 ">
            <button
              onClick={() => handleStatusUpdate("accepted")}
              className="text-lg bg-green-400 text-black font-semibold border border-green-700 rounded px-8 py-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleStatusUpdate("rejected")}
              className="text-lg bg-red-300 text-black font-semibold border border-red-700 rounded px-8 py-2"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestContent;
