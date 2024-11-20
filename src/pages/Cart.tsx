import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "../types";

type CartContextType = React.Dispatch<React.SetStateAction<Product[]>>;

function Cart() {
  const { cartItems, setCartItems } = useOutletContext<{
    cartItems: [];
    setCartItems: CartContextType;
  }>();

  const totalPrice = cartItems.reduce(
    (total, item: Product) => total + item.price * item.qty,
    0
  );

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((cartItems) =>
      cartItems.filter((item) => item.id !== productId)
    );
  };

  if (cartItems.length === 0) {
    return (
      <section className="flex justify-center items-center h-full">
        Your cart is empty.
      </section>
    );
  }

  return (
    <section className="flex flex-col p-8 items-center">
      <div className="w-full lg:w-[60%] flex flex-col gap-2">
        {cartItems.map((item: Product) => (
          <div
            className="shadow-sm rounded-sm flex justify-between p-2 border"
            key={item.id}
          >
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 aspect-square object-contain"
              />
              <div>
                <p className="text">{item.title}</p>
                <p className="font-medium text-sm mt-1">${item.price}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-around">
              <p className="text-sm">
                Qty: <span className="font-medium">{item.qty}</span>
              </p>
              <Button
                variant={"destructive"}
                className="text-xs"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="ml-auto mt-2 flex flex-col gap-2 items-end">
          <p className="text-sm">
            Total Price:{" "}
            <span className="font-medium text-base">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <Button>Checkout</Button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
