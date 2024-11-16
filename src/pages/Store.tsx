import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Product = {
  id: number;
  title: "string";
  category: "string";
  image: "string";
  price: number;
};

function Store() {
  // TODO: Implement loading and error screen
  const { isPending, error, data } = useQuery({
    queryKey: ["productsData"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });
  console.log(data);

  return (
    <section className="flex flex-col items-center p-8">
      <div className="grid grid-cols-3 gap-3 w-[60%]">
        {data &&
          data.map((product: Product) => (
            <Card className="rounded-sm" key={product.id}>
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
              <CardContent></CardContent>
              <CardFooter>
                <p>${product.price}</p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  );
}

export default Store;
