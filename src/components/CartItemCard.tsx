import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ItemsCountSelect from "./ItemsCountSelect";

function CartItemCard({
  item,
  handleRemoveFromCart,
  handleQtyChange,
}: {
  item: Product;
  handleRemoveFromCart: (id: number) => void;
  handleQtyChange: (id: number, qty: number) => void;
}) {
  return (
    <div className="shadow-sm rounded-sm flex justify-between p-2 border">
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
      <div className="flex flex-col items-end gap-2 justify-between">
        <p className="text-sm flex items-center gap-1">
          Quantity:
          <ItemsCountSelect
            value={item.qty.toString()}
            onChange={(value) => handleQtyChange(item.id, +value)}
          />
        </p>
        <Button
          variant={"destructive"}
          onClick={() => handleRemoveFromCart(item.id)}
          size="icon"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default CartItemCard;
