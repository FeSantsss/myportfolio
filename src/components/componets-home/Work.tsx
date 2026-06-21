import { WorkCase } from "./WorkCase";

export function Work() {
  return (
    <section
      id="work"
      className="pt-18 mx-2.5 md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">II - SELECTED PROJECTS</span>
      <h2 className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20">
        works
        <div className="w-full h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>

      <WorkCase />
    </section>
  );
}
