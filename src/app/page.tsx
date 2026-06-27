import { Work } from "@/components/componets-home/Work";
import { Footer } from "@/components/Footer";
import { About } from "@/components/componets-home/About";
import { Contact } from "@/components/componets-home/Contact";
import { Initialize } from "@/components/componets-home/Initialize";

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
