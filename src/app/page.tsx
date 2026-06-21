import { Hero } from "@/components/componets-home/Hero";
import { Work } from "@/components/componets-home/Work";
import { Intro } from "@/components/Intro";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Work />
      <Footer />
    </>
  );
}
