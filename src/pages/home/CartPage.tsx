import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../global/storeSlice";
import { payment } from "../../api/paymentAPI";
import { useContext } from "react";
import { GlobalContext } from "../../global/globalProvider";

const CartPage = () => {
  const { userID }: any = useContext(GlobalContext);
  const dispatch = useDispatch();
  const data = useSelector((el: any) => el.cart);

  const cost = data
    ?.map((el: any) => {
      return el.qty * parseFloat(el.productPrice);
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  return (
    <div className="m-4">
      <div>
        <p>Total Cost: ₦{cost.toLocaleString()}</p>
        <div className="flex mb-5">
          <p
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
            onClick={() => {
              payment({
                amount: cost,
                email: "gotext24@gmail.com",
              }).then((res) => {
                window.location.assign(res?.data?.data?.authorization_url);
              });
            }}
          >
            Proceed to Checkout
          </p>
        </div>
      </div>

      <div>
        <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {data?.map((el: any) => (
            <div key={el?.id} className="m-2">
              <img
                src={el?.productImage}
                className=" w-full h-[340px] rounded-t-md object-cover "
              />
              <p className="font-semibold mt-2">{el?.productName}</p>
              <div className="mt-3 w-full flex justify-between items-center">
                <p>₦{el?.productPrice * el?.qty}</p>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <p className="py-1 px-4 rounded-sm bg-red-500 text-white">
                      -
                    </p>
                    <p className="text-[28px]">{el?.qty}</p>
                    <p
                      className="py-1 px-4 rounded-sm bg-green-500 text-white mr-5"
                      onClick={() => {
                        dispatch(addProductToCart(el));
                      }}
                    >
                      +
                    </p>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                    onClick={() => {
                      dispatch(removeProductFromCart(el));
                    }}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
