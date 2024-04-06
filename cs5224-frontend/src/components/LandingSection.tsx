import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';


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
      <CardHeader className="flex-shrink-0 h-20">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <img src={imgurl} alt={title} className="w-full h-64 object-contain" /> 
      <CardContent className="flex-shrink-0">
        <CardDescription>{content}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default LandingSection;
