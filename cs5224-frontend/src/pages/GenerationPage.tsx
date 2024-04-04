import PortfolioForm from "@/PortfolioForm";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useLocalStorage from "use-local-storage";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  headline: z.string(),
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url(),
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
          <UploadResumeDialog />
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

const uploadResumeSchema = z.object({
  resume: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

function UploadResumeDialog() {
  const form = useForm<z.infer<typeof uploadResumeSchema>>({
    resolver: zodResolver(uploadResumeSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof uploadResumeSchema>) => {
    if (data.resume.length === 0) {
      return;
    }
    const file = data.resume[0];
    console.log(file);
  };

  const fileRef = form.register("resume");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Auto-fill from CV</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Upload your resume for auto-filling.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} accept=".pdf,.doc,.docx" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Upload CV</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenerationPage;
