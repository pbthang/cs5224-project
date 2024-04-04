import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={"border px-6 py-4 flex justify-between items-center"}>
      <Link className="flex gap-6 items-center hover:bg-white" to="/">
        <Avatar>
          <AvatarFallback>PB</AvatarFallback>
        </Avatar>
        <span className={"text-2xl font-semibold"}>PortfolioBuildr</span>
      </Link>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  );
}

export default Navbar;
