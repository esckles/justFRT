import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { resetPassword } from "../../api/authAPI";
import toast from "react-hot-toast";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);

    const decoded: any = jwtDecode(token!);
    if (password === confirmPassword) {
      resetPassword(decoded?.id, password).then((res) => {
        if (res.status === 200) {
          navigate("/auth/login");
        } else {
          toast.error("something went wrong");
        }
        console.log(res);
      });
    } else {
      toast.error("Password must match with confirm password");
    }
  };

  return (
    <div>
      <div className="w-[500px] border p-4">
        <p className="font-semibold uppercase text-[20px]">Reset Password</p>

        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">password</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="Enter Email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col my-2">
          <label className="font-semibold text-[12px]">confirm password</label>

          <input
            className="h-[45px] border pl-2 outline-none "
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? `Loading` : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
