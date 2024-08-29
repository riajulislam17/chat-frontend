import Signin from "@/components/Signin";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <Signin />
    </>
  );
}

export default index;
