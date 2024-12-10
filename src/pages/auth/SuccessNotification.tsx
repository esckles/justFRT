import { useEffect } from "react";
import { verifyPayment } from "../../api/paymentAPI";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProductToCart, emptyCart } from "../../global/storeSlice";

const SuccessNotification = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  console.log(search.split("reference=")[1]);

  useEffect(() => {
    verifyPayment(search.split("reference=")[1]).then((res) => {
      if (res?.data?.status === "success") {
        toast.success("Payment successful");
        dispatch(emptyCart());
      } else {
        toast.error("something went wrong with the Payment");
      }
    });
  }, []);

  return (
    <div className="w-[500px] p-10 border">
      Your request for password change has been activated, please go to your
      email to Verify this request
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SuccessNotification;
