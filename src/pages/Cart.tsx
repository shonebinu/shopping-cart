import { useOutletContext } from "react-router-dom";

function Cart() {
  const { cartItems } = useOutletContext<{ cartItems: [] }>();
  return <section className="flex flex-col items-center p-8"></section>;
}

export default Cart;
