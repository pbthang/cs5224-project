import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LandingSection({
  title,
  imgurl,
  content,
}: {
  title: string;
  imgurl: string;
  content: string;
}) {
  return (
    <Card className="w-full max-w-sm flex flex-col">
      <img
        src={imgurl}
        alt={title}
        className="w-full h-48 object-cover rounded"
      />
      <CardHeader className="flex-shrink-0 h-20 mb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-shrink-0">
        <CardDescription className="text-base">{content}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default LandingSection;
