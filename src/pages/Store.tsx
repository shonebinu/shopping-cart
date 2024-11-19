import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";

type Product = {
  id: number;
  title: "string";
  category: "string";
  image: "string";
  price: number;
};

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

  const handleAddToCart = (product: Product) => {
    setCartItems((cartItems: Product[]) => [...cartItems, product]);
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
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:w-[70%]">
        {data &&
          data.map((product: Product) => (
            <Card className="rounded-none grid" key={product.id}>
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square object-contain"
                />
                <CardTitle>
                  <p className="leading-5">{product.title}</p>
                </CardTitle>
                <CardDescription className="text-blue-500">
                  {product.category}
                </CardDescription>
              </CardHeader>
              <CardFooter className="self-end flex justify-between">
                <p className="font-medium">${product.price}</p>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  );
}

export default Store;
