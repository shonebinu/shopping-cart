import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

function Navbar({ cartItemsCount }: { cartItemsCount: number }) {
  return (
    <nav className="flex justify-between items-center py-2 px-8">
      <div className="font-semibold underline">fakestore</div>
      <div className="flex">
        <NavLink to="/">
          {({ isActive }) => (
            <Button variant="link" className={isActive ? "text-blue-500" : ""}>
              Home
            </Button>
          )}
        </NavLink>
        <NavLink to="/store">
          {({ isActive }) => (
            <Button variant="link" className={isActive ? "text-blue-500" : ""}>
              Store
            </Button>
          )}
        </NavLink>
        <NavLink to="/cart">
          {({ isActive }) => (
            <Button
              variant="ghost"
              className={isActive ? "text-blue-500 hover:text-blue-500" : ""}
            >
              <ShoppingCart />
              <Badge variant="secondary" className="px-1">
                <small className="w-2 text-center">{cartItemsCount}</small>
              </Badge>
            </Button>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
