import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "../types";
import CartItemCard from "@/components/CartItemCard";

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

  const handleQtyChange = (id: number, qty: number) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: qty } : { ...item }
      )
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
          <CartItemCard
            item={item}
            handleRemoveFromCart={handleRemoveFromCart}
            handleQtyChange={handleQtyChange}
          />
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
