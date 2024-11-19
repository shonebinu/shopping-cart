import Navbar from "./components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Outlet } from "react-router-dom";

type Product = {
  id: number;
  title: "string";
  category: "string";
  image: "string";
  price: number;
};

const Layout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar cartItemsCount={cartItems.length} />
      <Separator />
      <main className="flex-1 overflow-auto">
        <Outlet context={{ cartItems, setCartItems }} />
      </main>
    </div>
  );
};

export default Layout;
