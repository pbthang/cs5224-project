import PortfolioForm from "@/components/PortfolioForm";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useLocalStorage from "use-local-storage";
import { z } from "zod";
import UploadResumeDialog from "@/components/UploadResumeDialog";
import { ExternalLinkIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  headline: z.string().optional(),
  email: z.string().email(),
  linkedin: z.union([z.string().trim().url(), z.literal("")]),
  github: z.union([z.string().trim().url(), z.literal("")]),
  website: z.union([z.string().trim().url(), z.literal("")]),
  introduction: z.string(),
  skills: z.array(z.string()),
  education: z.array(
    z.object({
      school: z.string(),
      dates: z.string(),
      description: z.string(),
    })
  ),
  experience: z.array(
    z.object({
      position: z.string(),
      organization: z.string(),
      dates: z.string(),
      description: z.string(),
    })
  ),
});

export type PortfolioFormValues = z.infer<typeof formSchema>;

function GenerationPage() {
  const { user } = useUser();

  const formDefaultValue = {
    name: user?.fullName ?? "",
    headline: "",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    linkedin: "",
    github: "",
    website: "",
    introduction: "",
    skills: [],
    experience: [
      {
        position: "",
        organization: "",
        dates: "",
        description: "",
      },
    ],
    education: [
      {
        school: "",
        dates: "",
        description: "",
      },
    ],
  } as PortfolioFormValues;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useLocalStorage<PortfolioFormValues>(
    "portfolioFormData",
    formDefaultValue
  );

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  });

  const clearForm = () => {
    setFormValues(formDefaultValue);
    form.reset(formDefaultValue);
    toast.success("Form reset!");
  };

  return (
    <div>
      <Hero
        title="Build Your Portfolio!"
        subtitle={`${user?.firstName}, let's generate and deploy your portfolio!`}
      >
        <div className=" flex justify-center items-end">
          <Button asChild className="mr-2 text-white" variant={"link"}>
            <Link to="/">Back to Home</Link>
          </Button>
          <UploadResumeDialog portfolioForm={form} />
          <Button asChild className="ml-2" variant={"default"}>
            {/* open link in new tab */}
            <Link to="/preview" target="_blank">
              <ExternalLinkIcon size={14} className="mr-1" />
              Preview
            </Link>
          </Button>
          <Button onClick={clearForm} className="ml-4" variant={"secondary"}>
            Reset Form
          </Button>
        </div>
      </Hero>
      <div className="px-8 md:px-16 py-10 space-y-10">
        <PortfolioForm form={form} setFormValues={setFormValues} />
      </div>
    </div>
  );
}

export default GenerationPage;
