import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Navbar() {
  // TODO: Navbar isActive state to highlight the active nav link
  return (
    <nav className="flex justify-between items-center py-2 px-8">
      <div className="font-semibold underline">Fakestore</div>
      <div className="flex">
        <Button asChild variant="link">
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button asChild variant="link">
          <NavLink to="/store">Store</NavLink>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
