import { useContext, useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
import { GlobalContext } from "../global/globalProvider";
import { readUser } from "../api/authAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { userID }: any = useContext(GlobalContext);
  const data = useSelector((state: any) => state.cart);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    readUser(userID).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      }
    });
  }, []);

  const cost = data
    ?.map((el: any) => {
      return el.qty * parseFloat(el.productPrice);
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  return (
    <div>
      <div className="flex justify-between items-center mx-5">
        <div className="font-bold uppercase">Hi {user?.name},</div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div>₦{cost.toLocaleString()}</div>
          <Link to="/cart" className="relative">
            <IoIosCart className="text-[30px]" />
            <div className="bg-red-600 text-white w-4 h-4 rounded-full absolute top-0 right-0 flex items-center justify-center text-[10px]">
              {data.length}
            </div>
          </Link>
          <button
            className="bg-black text-white px-10 py-3 rounded-md "
            onClick={() => {
              localStorage.removeItem("userAuthLogin");
              window.location.reload();
            }}
          >
            Log Out
          </button>
        </div>
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Header;
