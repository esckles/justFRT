import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../api/authAPI";
import toast from "react-hot-toast";

const ForgetPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);

    forgetPassword(email)
      .then((res) => {
        if (res.status === 200) {
          navigate("/auth/forget-password-notification");
        } else {
          toast.error("error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="w-[500px] border p-4">
        <p className="font-semibold uppercase text-[20px]">Forgot Password</p>

        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">Email</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? `Loading` : "Submit"}
        </button>

        <div className="flex justify-center w-full text-[12px] mt-1">
          Want to try again,{" "}
          <span className="font-semibold italic ml-1">
            <Link to="/auth/login">Go Back To Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordScreen;
