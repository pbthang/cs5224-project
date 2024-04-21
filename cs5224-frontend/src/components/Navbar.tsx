import { SignedIn, UserButton } from "@clerk/clerk-react";
import { FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={"border px-6 py-4 flex justify-between items-center"}>
      <Link className="flex gap-2 items-center hover:bg-white" to="/">
        <FileTextIcon className="h-6 w-6" />
        <span className={"text-2xl font-semibold"}>PocketPortfolio</span>
      </Link>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  );
}

export default Navbar;
