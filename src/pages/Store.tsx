import { useQuery } from "@tanstack/react-query";

function Store() {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsData"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  return <section>{JSON.stringify(data)}</section>;
}

export default Store;
