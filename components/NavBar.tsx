import Link from "next/link";

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
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white cursor-pointer duration-200"
          >
            New Post
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
