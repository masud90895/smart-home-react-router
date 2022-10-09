import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { CartsDataContext } from "../utils/Root";
import CartItem from "./CartItem";
import { removeFromDb } from "../utils/fakeDB";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useContext(CartsDataContext);

  let total = 0;

  for (const product of cart) {
    total = total + product.price * product.quantity;
  }

  const clearData = () => {
    if (cart.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Add Product",
      });
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to buy products??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Order!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Ordered!", "Your order has been places.", "success");
          setCart([]);
         localStorage.clear();
        }else{
          Swal.fire("Cancel!", "Thanks For Comming.", "error");
        }
      });

      
    }
  };

  const remuveItem = (id) => {
    const restProduct = cart.filter((product) => product.id !== id);
    setCart(restProduct);
    removeFromDb(id);

    toast.error("product removed", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 text-gray-900">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 ">
        <h2 className="text-xl font-semibold">
          {cart.length ? "Review Cart Items" : "Cart is EMPTY!"}
        </h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              remuveItem={remuveItem}
            ></CartItem>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount: <span className="font-semibold">${total}</span>
          </p>
          <p className="text-sm text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <Link to="/shop">
            <button
              type="button"
              className="px-6 py-2 border rounded-full border-cyan-400"
            >
              Back <span className="sr-only sm:not-sr-only">to shop</span>
            </button>
          </Link>
          <button
            type="button"
            onClick={clearData}
            className="px-6 py-2 border font-semibold rounded-full hover:bg-cyan-400 bg-cyan-200 text-gray-800"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
