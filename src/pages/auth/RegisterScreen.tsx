import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../api/authAPI";
import toast, { Toaster } from "react-hot-toast";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("firstName", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", image);

    createAccount(formData).then((res) => {
      if (res.status === 201) {
        navigate("/auth/create-account-notification");
      } else {
        toast.error("Error creating user");
      }
    });
    //
  };

  return (
    <div>
      <Toaster />
      <div className="w-[500px] border p-4">
        <p className="font-semibold uppercase text-[20px]">Register</p>

        <div className="flex flex-col my-2">
          <label
            className=" px-8 py-3 bg-black text-white cursor-pointer font-semibold text-[12px]"
            htmlFor="pix"
          >
            Upload Image
          </label>

          <input
            id="pix"
            type="file"
            className="hidden h-[45px] border pl-2 outline-none "
            placeholder="Enter Name"
            onChange={handleImage}
          />
        </div>
        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">name</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">Email</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">password</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className={`${
            loading
              ? "bg-neutral-900 cursor-not-allowed animate-pulse"
              : "bg-black"
          } hover:bg-neutral-800 w-full text-white py-3 rounded-md mt-6 font-bold uppercase duration-300 transition-all`}
          onClick={handleSubmit}
        >
          {loading ? `Loading` : "Register"}
        </button>

        <div className="flex justify-center w-full text-[12px] mt-1">
          Already have an Account,{" "}
          <span className="font-semibold italic ml-1">
            <Link to="auth/login">Login Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
