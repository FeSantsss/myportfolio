import { Work } from "@/components/components-home/Work";
import { Footer } from "@/components/Footer";
import { About } from "@/components/components-home/About";
import { Contact } from "@/components/components-home/Contact";
import { Initialize } from "@/components/components-home/Initialize";

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
