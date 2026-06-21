import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("../Marquee").then((mod) => mod.Marquee));
export function Hero() {
  return (
    <section className="pt-[70px] max-w-[1900px] mx-2.5 md:pt-28 md:mx-12 2xl:mx-auto lg:px-2 xl:px-5 2xl:px-20">
      <span className="subtitles mb-1 md:mt-6 lg:mb-4">
        I - FULL-STACK DEVELOPER
      </span>
      <h1 className="font-[chillax] font-normal text-mybeige text-2xl leading-[1.3] lg:text-2xl">
        Hi, I'm <br />
        <span
          className="font-semibold text-[clamp(90px,27vw,100px)] mt-2 tracking-tighter leading-[0.80] block md:text-[clamp(90px,27vw,150px)] lg:text-[clamp(150px,17vw,200px)] 2xl:text-[clamp(220px,15vw,220px)]"
          translate="no"
        >
          Felipy <br /> Santos
        </span>
      </h1>
      <div className="flex flex-col items-start my-6 gap-5 md:items-end md:flex-row md:justify-between md:my-14 lg:my-12 xl:my-10 2xl:my-8">
        <p className="font-[montserrat] text-mywhite text-sm my-5 leadind-[1.65] max-w-[280px] opacity-70 md:max-w-[240px] lg:max-w-[280px] xl:max-w-[350px]">
          I build fast, scalable and client-friendly web applications with
          Next.js, Tailwind CSS, Sanity CMS, TypeScript and Spring Boot.
        </p>
        <div className="flex flex-col items-start md:items-end lg:scale-110">
          <div className="detail-item bg-[rgba(0,128,0,0.119)] text-[rgb(31,226,31)] border-green-600">
            <div className="w-2 h-2 bg-green-400 rounded-4xl inline-block mr-2 animate-pulse shadow-green-600"></div>
            <p>available for work</p>
          </div>
          <div className="detail-item">
            <p>Pernambuco, Brazil</p>
          </div>
          <div className="detail-item bg-[rgba(81,10,102,0.32)] text-[rgb(221,0,255)] border-[rgba(221,0,255,0.618)]">
            <p aria-label="creative and minimalist developer">
              creative and minimalist
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="text-2xl rotate-90 inline-block mt-2 animate-pulse"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 8H14M14 8L8 2M14 8L8 14"
            stroke="#484848"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Marquee />
    </section>
  );
}
