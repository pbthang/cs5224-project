import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LandingSection from "../components/LandingSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const LandingPage = () => {
  const steps = [
    {
      title: "Step 1: Log In",
      content:
        "Create an account or log in to your existing Portfolio Builder account. Access the dashboard to start the process of building your professional web portfolio.    ",
    },
    {
      title: "Step 2: Upload Your Resume",
      content:
        "Navigate to the resume upload section and submit your latest resume. Our AI will analyze your resume to extract relevant information and populate your portfolio.",
    },
    {
      title: "Step 3: Preview Your Portfolio",
      content:
        "Once the AI has created your portfolio, preview it to ensure that all details are accurate and reflect your professional experience and skills. Make any necessary edits or customizations.",
    },
    {
      title: "Step 4: Share Your Portfolio",
      content:
        "After finalizing your portfolio, publish it. You will receive a unique link that you can share with employers, clients, or on your social media to showcase your professional accomplishments. ",
    },
  ];
  const pricingTiers = [
    {
      tier: "Free Tier",
      price: "Free",
      features: [
        "Extract Features from your Resume",
        "Access to 1 standard portfolio template",
        "Restricted Customisation and Editing",
        "Portfolio hosted on AWS, fixed domain name",
        "No Search Engine Optimisation",
        "Portfolio updates each month",
        "Ad Supported",
        "No Analytics",
      ],
    },
    {
      tier: "Professional Version (Coming Soon)",
      price: "$14.99 SGD per month",
      features: [
        "All features from Free Tier",
        "Integration with Github and LinkedIn",
        "Full access to Portfolio Templates",
        "Full editing and customisation",
        "No ads",
      ],
    },
    {
      tier: "Premium Version (Coming Soon)",
      price: "$24.99 SGD per month",
      features: [
        "All features from Professional Version",
        "Full Analytics Capabilities",
        "Custom Domain",
        "Custom File Uploading",
        "Private, Password Protected Portfolio",
        "Priority Customer Support",
      ],
    },
  ];

  return (
    <div>
      <Hero
        title="Welcome!"
        subtitle="Build your Portfolio within a few clicks!"
      >
        <SignedIn>
          <Button asChild className="mr-4" variant={"secondary"}>
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
        <h2 className="text-4xl font-bold text-center">Why PortfolioBuildr?</h2>
        <div className="flex gap-6 justify-center my-12">
          <LandingSection
            title="Use AI to Create a Marketable Portfolio"
            imgurl="/image1.webp"
            content="With OpenAI technology, we will help you to create and build your own portfolio."
          />
          <LandingSection
            title="Free Hosting on AWS"
            imgurl="/image2.webp"
            content="Receive a link that you can use to share your portfolio with others."
          />

          <LandingSection
            title="Upload your Resume to get Started"
            imgurl="/image3.webp"
            content="Upload your Resume and we will magically extract out useful information."
          />
        </div>

        <h2 className="text-4xl font-bold text-center">
          How to Use PortfolioBuildr?
        </h2>
        <div className="flex flex-row justify-around items-stretch my-12">
          <Carousel className="max-w-4xl">
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader className="bg-primary text-white">
                        <CardTitle className="text-2xl font-bold">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardDescription className="text-base">
                          {step.content}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <h2 className="text-3xl font-bold text-center">
          Portfolio Builder Pricing
        </h2>
        <div className="flex flex-row justify-around items-stretch my-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-white font-bold">
                  Tier
                </TableHead>
                <TableHead className="bg-primary text-white font-bold">
                  Pricing
                </TableHead>
                <TableHead
                  colSpan={2}
                  className="bg-primary text-white font-bold"
                >
                  Features
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingTiers.map((tier) => (
                <TableRow key={tier.tier}>
                  <TableCell className="font-semibold">{tier.tier}</TableCell>
                  <TableCell>{tier.price}</TableCell>
                  <TableCell colSpan={2}>
                    <ul>
                      {tier.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h2 className="text-3xl font-bold text-center">
          Portfolio Builder FAQs
        </h2>
        <div className="flex flex-row justify-around items-stretch my-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is Portfolio Builder and how does it work?
              </AccordionTrigger>
              <AccordionContent>
                Portfolio Builder is an innovative platform that allows Students
                and Working Professionals to create professional web-based
                portfolios by simply uploading their resume. Utilizing OpenAI
                technology, it extracts relevant information from the resume to
                generate a comprehensive portfolio, which is then hosted on AWS.
                This process enables users to share their skills and experiences
                effectively with potential employers or clients through a
                personalized web portfolio.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do NUS Students get a Discount?
              </AccordionTrigger>
              <AccordionContent>
                Yes. NUS Students receive a 20% discount on the Professional and
                Premium Tiers, which will be launching in the next 6 months.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What makes Portfolio Builder unique?
              </AccordionTrigger>
              <AccordionContent>
                Portfolio Builder stands out by leveraging advanced AI to
                streamline the portfolio creation process, saving users time and
                effort. Unlike traditional portfolio sites, it offers a more
                automated approach, ensuring that the content is tailored to
                highlight the user's most relevant skills and experiences.
                Additionally, its seamless integration with AWS provides a
                reliable and scalable hosting solution.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is my data secure with Portfolio Builder, and who can access my
                portfolio?
              </AccordionTrigger>
              <AccordionContent>
                Data security is a top priority for Portfolio Builder. Your
                personal and professional information is securely processed and
                stored, with access strictly controlled by your chosen privacy
                settings. Your portfolio is hosted on AWS, ensuring robust
                security and privacy protections. You have full control over who
                can view your portfolio, allowing you to share it with selected
                individuals or the broader public based on your preferences.{" "}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What features can I access with the Free Tier of Portfolio
                Builder?
              </AccordionTrigger>
              <AccordionContent>
                With the Free Tier, you can extract features from your resume,
                access one standard portfolio template, and have limited
                customization and editing capabilities. Your portfolio will be
                hosted on AWS with a fixed domain name. This tier includes ads,
                allows portfolio updates each month, but does not offer search
                engine optimization or analytics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
