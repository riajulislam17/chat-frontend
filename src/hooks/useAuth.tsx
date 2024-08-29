import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const checkAuth = () => {
  const isLoggedIn =
    Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`) || null;
  return isLoggedIn;
};

const useAuth = (WrappedComponent: any, requireAuth: boolean = true) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);

    useEffect(() => {
      const checkAuthentication = () => {
        const loggedIn = checkAuth();
        setIsLoggedIn(loggedIn);
        if (requireAuth && !loggedIn) {
          router.push("/signin?redirect=" + router.pathname);
        }
      };

      checkAuthentication();

      return () => setIsLoggedIn(null);
    }, [requireAuth, router.pathname]);

    if (isLoggedIn === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default useAuth;
