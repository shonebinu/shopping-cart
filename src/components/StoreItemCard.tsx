import { Product } from "../types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ItemsCountSelect from "./ItemsCountSelect";

function StoreItemCard({
  product,
  handleAddToCart,
}: {
  product: Product;
  handleAddToCart: (product: Product, qty?: number) => void;
}) {
  const [selectValue, setSelectValue] = useState("1");

  const onSelectChange = (value: string) => setSelectValue(value);

  return (
    <Card className="rounded-sm grid">
      <CardHeader>
        <img
          src={product.image}
          alt={product.title}
          className="aspect-square object-contain"
        />
        <CardTitle className="text-sm">
          <p className="leading-5">{product.title}</p>
        </CardTitle>
        <CardDescription className="text-blue-500 text-xs underline">
          {product.category}
        </CardDescription>
      </CardHeader>
      <CardFooter className="self-end flex justify-between gap-3">
        <p className="font-medium text-sm">${product.price}</p>
        <div className="flex gap-1">
          <ItemsCountSelect
            value={selectValue.toString()}
            onChange={onSelectChange}
          />
          <Button
            variant="secondary"
            className="text-xs"
            onClick={() => handleAddToCart(product, +selectValue)}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default StoreItemCard;
