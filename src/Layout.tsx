import Navbar from "./components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Product } from "./types";

const Layout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        cartItemsCount={cartItems.reduce(
          (count, curr) => count + (curr.qty ?? 0),
          0
        )}
      />
      <Separator />
      <main className="flex-1 overflow-auto">
        <Outlet context={{ cartItems, setCartItems }} />
      </main>
    </div>
  );
};

export default Layout;
