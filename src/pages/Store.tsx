import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Product } from "../types";
import StoreItemCard from "../components/StoreItemCard";

type CartContextType = React.Dispatch<React.SetStateAction<Product[]>>;

function Store() {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsData"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const { setCartItems } = useOutletContext<{
    setCartItems: CartContextType;
  }>();

  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems((cartItems: Product[]) => {
      const existingProductQty =
        cartItems.find(({ id }: Product) => id === product.id)?.qty ?? 0;

      return [
        ...cartItems.filter(({ id }: Product) => id !== product.id),
        { ...product, qty: existingProductQty + qty },
      ];
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin" />
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>An error has occured: {error.message}</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center p-8">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:w-[80%]">
        {data &&
          data.map((product: Product) => (
            <StoreItemCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </section>
  );
}

export default Store;
