import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tableImg from "../assets/table.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  removeProduct,
} from "../redux/slice/CartSlice";
function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
    dispatch(removeFromCart(productId));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  return (
    <>
      <div className=" p-4 ">
        <div className="flex w-full  ">
          <div className="w-1/2 text-black text-start">
            <h1 className=" font-headline-4 ">Cart</h1>
          </div>
        </div>
        {cart && cart.map((item) => {
          return (
          item && item.product && (
              <div className="w-full h-[150px] flex flex-row gap-4 border-b-gray-300 border-b-2 ">
                <div className="w-[30%]">
                  <img
                    src={item?.product?.images[0]?.url}
                    alt="table-img"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-row justify-between w-[70%] py-3">
                  <div className="flex flex-col justify-evenly w-full">
                    <div className="text-black font-button-s text-md font-semibold mb-2">
                      {item.product.name}
                    </div>
                    <div className="text-darkslategray font-button-s text-sm mb-2">
                      Color: Black
                    </div>
                    <div className="border border-black rounded-md flex flex-row items-center px-2 py-1 w-fit">
                      <button
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => handleIncrement(item.product._id)}
                      >
                        <FaPlus size={10} />
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center text-lg ">
                        {item.quantity}
                      </div>
                      <button
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => handleDecrement(item.product._id)}
                      >
                        <FaMinus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col w-[30%] py-3">
                    <div className=" font-headline-4 text-start text-black">
                      {item.product.price}
                    </div>
                    <div
                      className=" text-darkslategray mt-3 cursor-pointer  "
                      onClick={() => handleRemoveProduct(item.product._id)}
                    >
                      <RxCross1 size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ) 
          );
        })}
      </div>
    </>
  );
}

export default Cart;
