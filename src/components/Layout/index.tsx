import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../Common/Loader";
import { handleResource } from "@/utils/APIRequester";
import { userSliceData } from "../../../app/feature/userSlice";
import { useDispatch } from "react-redux";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout = ({ children, requireAuth = false }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    setLoading(true);
    try {
      const result = await handleResource({
        method: "get",
        endpoint: "users/profile",
        popMessage: false,
      });
      if (result) {
        dispatch(
          userSliceData({
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
          })
        );
      } else if (requireAuth) {
        router.push("/signin");
      }
      setLoading(false);
    } catch (error) {
      if (requireAuth) {
        router.push("/signin");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <div className="min-h-screen w-full">
          <div className="m-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
