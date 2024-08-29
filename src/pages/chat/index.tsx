import Chat from "@/components/Common/Chat";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <Chat />
    </>
  );
}

export default index;
