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
import { Link, useLocation } from "react-router-dom";

function GenerateSuccessPage() {
  const { state } = useLocation();

  return (
    <div>
      <Hero
        title="Portfolio Generated!"
        subtitle="Your webpage has been generated successfully!"
      ></Hero>
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
