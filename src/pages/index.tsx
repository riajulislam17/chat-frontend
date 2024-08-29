import Chat from "@/components/Common/Chat";
import HomePage from "@/components/Common/HomePage";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <Chat />
      {/* <HomePage /> */}
    </>
  );
}
