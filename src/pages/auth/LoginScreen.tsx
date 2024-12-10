import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginAccount, verifyAccount } from "../../api/authAPI";
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "../../global/globalProvider";

const LoginScreen = () => {
  const { setUserID }: any = useContext(GlobalContext);
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token!);
      verifyAccount(decoded?.id);
    }
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    // loginAccount;\
    loginAccount({ email, password })
      .then((res) => {
        if (res.status === 201) {
          const getID: any = jwtDecode(res.data!);

          //   setUserID(getID?.id);
          localStorage.setItem("userAuthLogin", JSON.stringify(getID?.id));
          navigate("/");
          toast.success("Login Successful");
        } else {
          toast.error(res.response?.data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="w-[500px] border p-4">
        <p className="font-semibold uppercase text-[20px]">Login</p>

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

        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-sm  italic border-b-black border-b text-blue-950"
          >
            Forgot Password?
          </Link>
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
          {loading ? `Loading` : "Login"}
        </button>

        <div className="flex justify-center w-full text-[12px] mt-1">
          Don't have an Account,{" "}
          <span className="font-semibold italic ml-1">
            <Link to="auth">Create One Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
