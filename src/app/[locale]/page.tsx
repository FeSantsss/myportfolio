import dynamic from "next/dynamic";

import { Initialize } from "@/components/components-home/Initialize";

const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer),
);
const Contact = dynamic(() =>
  import("@/components/components-home/Contact").then((mod) => mod.Contact),
);
const About = dynamic(() =>
  import("@/components/components-home/About").then((mod) => mod.About),
);
const Work = dynamic(() =>
  import("@/components/components-home/Work").then((mod) => mod.Work),
);

export default function Home() {
  return (
    <>
      <Initialize />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
