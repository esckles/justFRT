import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProductToCart } from "../../global/storeSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.products);

  const mainData = data.filter((el: any) => el.id === id)[0];

  return (
    <div className="m-10">
      <div className="flex flex-col items-center ">
        <p>{mainData?.productName}</p>
        <img
          className="h-[450px] w-[300px] border rounded-md object-cover"
          src={mainData?.productImage}
          alt={mainData?.productName}
        />
        <div className="w-[300px] my-4">{mainData?.productDescription}</div>
        <div className="w-[300px] justify-between items-center">
          {""}
          <button
            className="bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 text-white py-2 px-4 text-[15px] rounded-md mt-5"
            onClick={() => {
              dispatch(addProductToCart(mainData));
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
