import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;
