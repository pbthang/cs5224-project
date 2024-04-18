import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user } = useUser();

  return (
    <div>
      <Hero
        title="Profile"
        subtitle={`Hi, ${user?.firstName}. Welcome to your profile page!`}
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </Hero>
      <div className="px-8 md:px-16 py-10 space-y-10">
        <div>Logged in as {user?.fullName}</div>
      </div>
    </div>
  );
}

export default ProfilePage;
