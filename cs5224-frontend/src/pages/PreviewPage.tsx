import { useEffect, useState } from "react";
import ejs from "ejs";
import useLocalStorage from "use-local-storage";
import { useUser } from "@clerk/clerk-react";

function PreviewPage() {
  const [template, setTemplate] = useState<string>("");
  const { user } = useUser();

  const [values] = useLocalStorage("portfolioFormData", {});

  useEffect(() => {
    fetch("/template.ejs").then((res) => {
      res.text().then((text) => {
        setTemplate(text);
      });
    });
  }, []);

  return (
    // <div
    //   className="unreset"
    //   dangerouslySetInnerHTML={{
    //     __html: ejs.render(template, {
    //       ...values,
    //       img: user?.imageUrl,
    //     }),
    //   }}
    // />
    <iframe
      title="Preview"
      srcDoc={ejs.render(template, {
        ...values,
        img: user?.imageUrl,
      })}
      className="w-full h-screen border-none"
    ></iframe>
  );
}

export default PreviewPage;
