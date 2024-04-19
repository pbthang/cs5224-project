import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export interface PortfolioArchiveEntry {
  url: string;
  createdAt: Date;
}

function GenerateSuccessPage() {
  const { state } = useLocation();
  const [portfolioArchive, setPortfolioArchive] = useLocalStorage<
    PortfolioArchiveEntry[]
  >("portfolioArchive", []);

  useEffect(() => {
    if (
      state?.url &&
      !portfolioArchive.some((entry) => entry.url === state.url)
    ) {
      setPortfolioArchive([
        {
          url: state.url,
          createdAt: new Date(),
        },
        ...portfolioArchive,
      ]);
    }
  }, []);

  return (
    <div>
      <Hero
        title="Portfolio Generated!"
        subtitle="Your webpage has been generated successfully!"
      >
        <Button asChild className="mr-2 text-white" variant={"link"}>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild className="mr-2" variant="secondary">
          <Link to="/profile">View Archive</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/generate">Generate Another</Link>
        </Button>
      </Hero>
      <div className="flex justify-center">
        <Card className="max-w-6xl m-auto my-20">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Visit your portfolio at</CardTitle>
          </CardHeader>
          <CardContent className="flex-shrink-0">
            <CardDescription className="text-base">
              <Input value={state?.url} readOnly className="w-96" />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(state?.url);
              }}
              variant="secondary"
            >
              <CopyIcon size={14} className="mr-1" />
              Copy URL
            </Button>
            <Button asChild className="ml-2" variant={"default"}>
              <Link to={state?.url} target="_blank">
                <ExternalLinkIcon size={14} className="mr-1" />
                View Portfolio
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default GenerateSuccessPage;
