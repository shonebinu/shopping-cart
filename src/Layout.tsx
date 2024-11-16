import Navbar from "./components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Separator />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
