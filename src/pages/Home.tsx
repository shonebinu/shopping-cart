import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex flex-col justify-center items-center gap-5 h-[90%]">
      <h1 className="text-3xl font-bold">
        Welcome to <span className="underline">Fake Store</span>
      </h1>
      <p className="lg:w-[40vw] text-center">
        Want a fake Bugatti? Clothes? Electronics? Anything you want, all within
        your reach. Check it out now!
      </p>
      <Link to="/store">
        <Button>Visit Store</Button>
      </Link>
    </section>
  );
}

export default Home;
