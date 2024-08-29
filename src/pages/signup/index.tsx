import Head from "next/head";
import React from "react";
import Signup from "@/components/Signup";
// import useAuth from "@/hooks/useAuth";

const index = () => {
  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <Signup />
    </>
  );
};

export default index;
