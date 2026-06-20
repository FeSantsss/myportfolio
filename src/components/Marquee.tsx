const items = [
  "NEXT.JS",
  "TYPESCRIPT",
  "JAVA",
  "SPRING BOOT",
  "FAST WEB APPLICATIONS",
  "SCALABLE SYSTEMS",
  "MODERN WEB PRODUCTS",
  "AVAILABLE FOR PROJECTS",
  "REMOTE WORLDWIDE",
  "PERFORMANCE",
  "USER EXPERIENCE",
  "CLEAN ARCHITECTURE",
  "WEB SYSTEMS",
  "RELIABLE SOFTWARE",
];

export function Marquee() {
  return (
    <div
      className="overflow-hidden w-full bg-[#ffffff00] border-y-[0.5px] border-[rgba(190,190,190,0.488)] py-3.5 select-none mt-10"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee-scroll">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-5 font-[montserrat] text-[0.68rem] tracking-widest text-mybeige flex-nowrap uppercase"
          >
            <span className="text-mywhite tracking-widest"> • </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
