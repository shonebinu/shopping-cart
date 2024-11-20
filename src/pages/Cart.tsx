import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "../types";

function Cart() {
  const { cartItems } = useOutletContext<{ cartItems: [] }>();
  return (
    <section className="flex flex-col p-8 items-center">
      <div className="w-full lg:w-[60%] flex flex-col gap-2">
        {cartItems.map((item: Product) => (
          <div
            className="shadow-sm rounded-sm flex gap-4 p-2 border"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 aspect-square object-contain p-1"
            />
            <div>
              <p>{item.title}</p>
              <p className="font-semibold text-sm">${item.price}</p>
            </div>
          </div>
        ))}
        <div className="ml-auto mt-2">
          <Button>Checkout</Button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
