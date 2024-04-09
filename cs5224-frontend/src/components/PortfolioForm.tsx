import { UseFieldArrayReturn, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { InputTags } from "./ui/multitaginput";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { PortfolioFormValues } from "../pages/GenerationPage";

interface PortfolioFormProps {
  setFormValues: (values: PortfolioFormValues) => void;
  form: ReturnType<typeof useForm<PortfolioFormValues>>;
}

function PortfolioForm({ setFormValues, form }: PortfolioFormProps) {
  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values as PortfolioFormValues);
    });
    return () => subscription.unsubscribe();
  }, []);

  const exprFieldArr = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const eduFieldArr = useFieldArray({
    control: form.control,
    name: "education",
  });

  function onSubmit(values: PortfolioFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer | Writer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input placeholder="Your LinkedIn URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input placeholder="Your GitHub URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="Your Website URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction</FormLabel>
              <FormControl>
                <Textarea placeholder="A Short Introduction" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <InputTags {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-1 justify-between items-center">
          <h3 className="text-xl font-semibold">Experience</h3>
        </div>
        <ExprForm exprFieldArr={exprFieldArr} form={form} />
        <div className="flex gap-1 justify-between items-center">
          <h3 className="text-xl font-semibold">Education</h3>
        </div>
        <EducationForm eduFieldArr={eduFieldArr} form={form} />
        <div className="flex justify-end">
          <Button className="my-2" type="submit">
            Generate Your Portfolio
          </Button>
        </div>
      </form>
    </Form>
  );
}

interface ExprFormProps {
  exprFieldArr: UseFieldArrayReturn<PortfolioFormValues, "experience", "id">;
  form: ReturnType<typeof useForm<PortfolioFormValues>>;
}

function ExprForm({ exprFieldArr, form }: ExprFormProps) {
  return (
    <ScrollArea className="h-[380px]">
      {exprFieldArr.fields.map((field, idx) => (
        <Card key={field.id} id={field.id} className="px-4 py-4 mb-2 space-y-2">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name={`experience.${idx}.position`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-0"
                      placeholder="Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${idx}.dates`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dates</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan 2020 - Dec 2021" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`experience.${idx}.organization`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`experience.${idx}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Job Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 items-center mt-4">
            {idx === exprFieldArr.fields.length - 1 && (
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() =>
                  exprFieldArr.append({
                    position: "",
                    organization: "",
                    dates: "",
                    description: "",
                  })
                }
              >
                <CirclePlusIcon className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            )}
            <Button
              variant={"destructive"}
              size={"sm"}
              className="self-end"
              onClick={() => exprFieldArr.remove(idx)}
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </ScrollArea>
  );
}

interface EducationFormProps {
  eduFieldArr: UseFieldArrayReturn<PortfolioFormValues, "education", "id">;
  form: ReturnType<typeof useForm<PortfolioFormValues>>;
}

function EducationForm({ eduFieldArr, form }: EducationFormProps) {
  return (
    <ScrollArea className="h-[380px]">
      {eduFieldArr.fields.map((field, idx) => (
        <Card key={field.id} id={field.id} className="px-4 py-4 mb-2 space-y-2">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name={`education.${idx}.school`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-0"
                      placeholder="National University of Singapore"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${idx}.dates`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dates</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan 2020 - Dec 2021" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`education.${idx}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bachelor's Degree (Hon.) in Computer Science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 items-center mt-4">
            {idx === eduFieldArr.fields.length - 1 && (
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() =>
                  eduFieldArr.append({
                    school: "",
                    dates: "",
                    description: "",
                  })
                }
              >
                <CirclePlusIcon className="w-4 h-4 mr-2" /> Add Education
              </Button>
            )}
            <Button
              variant={"destructive"}
              size={"sm"}
              className="self-end"
              onClick={() => eduFieldArr.remove(idx)}
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </ScrollArea>
  );
}

export default PortfolioForm;
