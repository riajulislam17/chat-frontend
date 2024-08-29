import React, { useEffect } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Head from "next/head";
import Layout from "@/components/Layout";
import { checkAuth } from "@/hooks/useAuth";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  const pagesWithoutLayout = ["/signin", "/signup", "/forget-password"];

  const privateRoutes = ["/", "/chat", "/profile"];

  const shouldRenderWithoutLayout = pagesWithoutLayout.some((route) =>
    router.pathname.startsWith(route)
  );

  useEffect(() => {
    const isAuthenticated = checkAuth();
    const isPrivateRoute = privateRoutes.includes(router.pathname);

    if (isPrivateRoute && !isAuthenticated) {
      router.push("/signin?redirect=" + router.pathname);
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.jpg" />
      </Head>
      <Provider store={store}>
        {!shouldRenderWithoutLayout && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        {shouldRenderWithoutLayout && <Component {...pageProps} />}
      </Provider>
    </>
  );
}

export default MyApp;
