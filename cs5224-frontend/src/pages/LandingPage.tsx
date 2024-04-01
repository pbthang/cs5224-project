import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const LandingPage = () => {
  const { user } = useUser();

  return (
    <div>
      <Hero
        title="Welcome!"
        subtitle="Build your Portfolio within a few clicks!"
      >
        <SignedIn>
          <Button asChild className="mr-4">
            <Link to="/profile">Profile</Link>
          </Button>
          <Button asChild>
            <Link to="/generate">Build your Portfolio</Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <Button asChild className="mr-4">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-in">Log In</Link>
          </Button>
        </SignedOut>
      </Hero>
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-3xl font-bold text-center">Landing Page</h2>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
          totam ullam, placeat deleniti ut voluptatem accusantium? Sed
          consequuntur veritatis error quos provident, architecto iste adipisci,
          iusto non laudantium quis doloremque?
        </div>
      </div>
    </div>
  );
};
