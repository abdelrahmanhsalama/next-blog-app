import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="font-sans text-2xl">Blog</h1>
      </Link>
      <div className="flex gap-4">
        {/* <ul className="flex gap-4">
          <li className="border-b border-b-transparent hover:border-b-foreground duration-100 cursor-pointer">
            Most Recent
          </li>
          <li className="border-b border-b-transparent hover:border-b-foreground duration-100 cursor-pointer">
            Most Liked
          </li>
        </ul> */}
        <Link href="/new-post">
          <button
            type="button"
            className="text-foreground bg-background border border-foreground px-2 py-1 rounded hover:text-background hover:bg-foreground duration-200 cursor-pointer"
          >
            New Post
          </button>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
