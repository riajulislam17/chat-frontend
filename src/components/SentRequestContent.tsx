import React from "react";

interface Props {
  selectedUser: any;
}

function SentRequestContent({ selectedUser }: Props) {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen gap-3">
        <div>
          <p className="text-9xl rounded-full bg-gray-200 p-12 text-center">
            {getInitials(selectedUser?.receiverInfo?.name)}
          </p>
          <p className="text-2xl font-semibold text-center my-5">
            {selectedUser?.receiverInfo?.name}
          </p>
          <p className="text-xl font-semibold text-center my-5">
            {selectedUser?.receiverInfo?.email}
          </p>
          {/* <div className="flex justify-center items-center gap-3 ">
        <button className="text-lg text-green-500 font-semibold border-2 border-green-500 rounded px-8 py-2">
          Accept
        </button>
        <button className="text-lg text-red-500 font-semibold border-2 border-red-500 rounded px-8 py-2">
          Reject
        </button>
      </div> */}
        </div>
      </div>
    </>
  );
}

export default SentRequestContent;
