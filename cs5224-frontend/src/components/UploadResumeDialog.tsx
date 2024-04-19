/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PortfolioFormValues } from "@/pages/GenerationPage";
import moment from "moment";
import { LoadingSpinner } from "./ui/spinner";
import { FileTextIcon } from "lucide-react";

const uploadResumeSchema = z.object({
  resume: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

interface UploadResumeDialogProps {
  portfolioForm: ReturnType<typeof useForm<PortfolioFormValues>>;
}

function UploadResumeDialog({ portfolioForm }: UploadResumeDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof uploadResumeSchema>>({
    resolver: zodResolver(uploadResumeSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  const setScannedValues = (values: any) => {
    const { education, employer, personal_urls, skills } = values.data;

    if (education?.length > 0) {
      const updated = education.map((item: any) => ({
        school: item.institute,
        dates: `${
          item.from_month ? moment().month(item.from_month).format("MMM") : ""
        } ${item.from_year || ""} - ${
          item.to_month ? moment().month(item.to_month).format("MMM") : ""
        } ${item.to_year || ""}`,
        description: [item.degree, item.course].filter(Boolean).join(", "),
      }));
      portfolioForm.setValue("education", updated);
    }

    if (employer?.length > 0) {
      const updated = employer.map((item: any) => ({
        position: item.role,
        organization: item.company_name,
        dates: `${
          item.from_month && moment().month(item.from_month).format("MMM")
        } ${item.from_year || ""} ${item.is_current ? "- Present" : ""}`,
        description: item.description,
      }));
      portfolioForm.setValue("experience", updated);
    }

    if (skills?.overall_skills?.length > 0) {
      portfolioForm.setValue("skills", skills.overall_skills);
    }

    if (personal_urls?.length > 0) {
      const linkedin = personal_urls
        .flat(Infinity)
        .find((url: string) => url.includes("linkedin"));
      const github = personal_urls
        .flat(Infinity)
        .find((url: string) => url.includes("github"));
      const website = personal_urls
        .flat(Infinity)
        .find(
          (url: string) => !url.includes("linkedin") && !url.includes("github")
        );
      if (linkedin) {
        portfolioForm.setValue("linkedin", "https://" + linkedin);
      }
      if (github) {
        portfolioForm.setValue("github", "https://" + github);
      }
      if (website) {
        portfolioForm.setValue("website", "https://" + website);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof uploadResumeSchema>) => {
    if (data.resume.length === 0) {
      return;
    }
    const file = data.resume[0];

    try {
      // scan resume
      const uploadUrl = `https://api.superparser.com/parse`;
      // send binary
      const formData = new FormData();
      formData.append("file_name", file);
      const { data } = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": import.meta.env.VITE_SUPERPARSER_API_KEY,
        },
      });

      console.log(data);

      setScannedValues(data);

      console.log(portfolioForm.getValues("skills"));

      const payload = {
        name: portfolioForm.getValues("name"),
        skills: portfolioForm.getValues("skills"),
        education: portfolioForm.getValues("education"),
        experience: portfolioForm.getValues("experience"),
      };

      console.log(payload);

      // get introduction
      const { data: introData } = await axios.post(
        import.meta.env.VITE_OPENAI_BACKEND_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (introData?.Introduction) {
        portfolioForm.setValue("introduction", introData.Introduction);
      }
      if (introData?.Headline) {
        portfolioForm.setValue("headline", introData.Headline);
      }

      form.reset();
      toast.success("Resume scanned successfully.");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to scan resume.");
      return;
    }
  };

  const fileRef = form.register("resume");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          <FileTextIcon size={14} className="mr-2" />
          Auto-fill
        </Button>
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <LoadingSpinner className={"h-5 w-5 mr-2"} />
                )}
                Upload CV
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadResumeDialog;
