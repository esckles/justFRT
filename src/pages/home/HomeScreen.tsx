import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { viewProduct } from "../../api/storeAPI";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addProductToStore } from "../../global/storeSlice";
import Header from "../../static/Header";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.products);

  useEffect(() => {
    viewProduct().then((res) => {
      dispatch(addProductToStore(res));
    });
  }, []);

  return (
    <div className="flex flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Page</title>
        <link rel="canonical" href="http://localhost:5274" />
        <meta name="description" content="This is the best application ever" />
      </Helmet>

      <div className="mx-10  ">
        <p>Product</p>

        <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {data?.map((el: any) => (
            <div key={el?.id} className="m-2">
              <img
                src={el?.productImage}
                className=" w-full h-[340px] rounded-t-md object-cover "
              />
              <p className="font-semibold mt-2">{el?.productName}</p>
              <div className="mt-3 w-full flex justify-between items-center">
                <p>₦{el?.productPrice}</p>
                <div className="flex gap-2">
                  <Link
                    to={`/product/${el?.id}`}
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                  >
                    View Product
                  </Link>
                  <button
                    className="bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                    onClick={() => {
                      dispatch(addProductToCart(el));
                    }}
                  >
                    Add to Cart
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

export default HomeScreen;
