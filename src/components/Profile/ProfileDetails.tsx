import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import TextField from "../FormField/TextField";
import useForm from "@/hooks/useForm";
import { CiEdit } from "react-icons/ci";
import PasswordTextField from "../FormField/PasswordTextField";

interface Profile {
  id: number;
  name: null;
  phone: string;
  email: null;
  address: null;
  role: string;
  created_at: Date;
  updated_at: Date;
}

function ProfileDetails() {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | number | string[]>();
  const router = useRouter();

  const { formData, handleChange, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (router.query.id) {
      setOrderId(router.query.id);
    }
  }, [router.query.id]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await handleResource({
        method: "get",
        endpoint: `users/profile`,
        popMessage: false,
      });
      if (res.user) {
        reset({
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
        });
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [orderId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password && formData.password,
      };
      const result = await handleResource({
        method: "patch",
        endpoint: "users/profile",
        data: payload,
        isMultipart: false,
        popMessage: true,
        popText: "Profile Update Successfully !",
      });
      getProfile();
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3">
            <div>
              <TextField
                placeholder="John Duo"
                type="text"
                title="Name"
                required={false}
                name="name"
                onChange={(value: string) => handleChange("name", value)}
                value={formData?.name}
              />
            </div>
            <div>
              <TextField
                placeholder="example@example.com"
                type="phone"
                title="Phone"
                required={false}
                name="phone"
                disabled={true}
                onChange={(value: string) => handleChange("phone", value)}
                value={formData?.phone}
              />
            </div>

            <div>
              <TextField
                placeholder="example@example.com"
                type="email"
                title="Email"
                required={false}
                name="email"
                disabled={false}
                onChange={(value: string) => handleChange("email", value)}
                value={formData?.email || ''}
              />
            </div>

            <div>
              <PasswordTextField
                placeholder="******"
                title="Password"
                required={false}
                name="password"
                disabled={false}
                onChange={(value: string) => handleChange("password", value)}
                value={formData?.password}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" bg-black font-semibold text-white p-2 rounded hover:bg-gray-400 mt-3 flex justify-center items-center"
            >
              {" "}
              <span className="text-2xl mr-2 font-bold">
                <CiEdit />
              </span>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileDetails;
