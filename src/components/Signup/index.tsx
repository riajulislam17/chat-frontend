import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosLogIn, IoMdArrowRoundBack } from "react-icons/io";
import TextField from "../FormField/TextField";
import PasswordTextField from "../FormField/PasswordTextField";
import Loader from "../Common/Loader";
import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { userSliceData } from "../../../app/feature/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function Index() {
  const [loading, setLoading] = useState(false);
  let token: string | null = "" || null;

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
    if (token) {
      router.push("/");
    }
    setLoading(false);
  }, [token]);

  const router = useRouter();
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleResource({
        method: "post",
        endpoint: "users/signup",
        data: formData,
        isMultipart: false,
        popMessage: true,
        popText: "Signup Successfully !",
      });
      Cookies.set(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`, result.token, {});
      dispatch(
        userSliceData({
          id: result.results._id,
          name: result.results.name,
          email: result.results.email,
        })
      );

      router.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-10 bg-white rounded-lg -lg border border-blue-300">
          {/* <p className="mb-5">
            <Link
              href={"/"}
              className="text-blue-600 font-semibold flex items-center gap-1"
            >
              <IoMdArrowRoundBack /> Go Home
            </Link>
          </p> */}
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                placeholder="Jhon Duo"
                type="text"
                title="Name"
                required={true}
                name="name"
                onChange={(value: string) => handleChange("name", value)}
                value={formData.name}
              />
            </div>

            <div>
              <TextField
                placeholder="example@gmail.com"
                type="email"
                title="Email"
                required={true}
                name="email"
                onChange={(value: string) => handleChange("email", value)}
                value={formData.email}
              />
            </div>

            <div>
              <PasswordTextField
                placeholder="********"
                title="Password"
                required={true}
                name="password"
                onChange={(value: string) =>
                  handleChange("password", value.trim())
                }
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className={`${
                loading || (!formData.email && !formData.password)
                  ? "w-full bg-gray-500 font-semibold text-white p-2 rounded mt-3 flex justify-center items-center"
                  : "w-full bg-blue-500 font-semibold text-white p-2 rounded hover:bg-blue-400 mt-3 flex justify-center items-center"
              }  `}
              disabled={
                loading || (!formData.email && !formData.password)
                  ? true
                  : false
              }
            >
              SIGN UP
              <span className="text-2xl ml-2 font-bold">
                <IoIosLogIn />
              </span>
            </button>
          </form>
          <div className="flex justify-between items-center gap-3 mt-3">
            <p className="">
              Already User?{" "}
              <Link href={"/signin"} className="text-blue-600 font-semibold">
                {" "}
                SignIn{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
