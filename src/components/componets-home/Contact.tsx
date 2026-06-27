export function Contact() {
  return (
    <section
      id="contact"
      className="pt-52 max-w-[1900px] mx-2 -mb-10 lg:px-2 2xl:mx-auto"
    >
      <div className="font-[chillax] text-mybeige font-bold text-right">
        <div className="lowercase">
          <p className="text-7xl md:text-8xl lg:text-9xl">got</p>

          <p className="text-5xl -mb-2.5 md:text-7xl lg:text-8xl">a</p>
          <p className="text-7xl mb-1 tracking-widest md:text-8xl lg:text-9xl">
            {" "}
            project
          </p>
          <p className="text-5xl md:text-7xl lg:text-8xl"> in mind?</p>
        </div>
        <h3 className="text-7xl mt-2.5 lowercase md:text-8xl lg:text-9xl">
          let's build together!
        </h3>
      </div>
      <div
        translate="no"
        className="font-[montserrat] text-mywhite text-sm opacity-70 flex flex-col gap-5 mx-2.5 mt-10 md:flex-row"
      >
        <div className="group link-line">
          <a href="mailto:hello@felipysantsss.dev">hello@felipysantsss.dev</a>
          <span className="inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8H14M14 8L8 2M14 8L8 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="group link-line">
          <a href="">instagram</a>
          <span className="inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8H14M14 8L8 2M14 8L8 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="group link-line">
          <a href="">linkedIn</a>
          <span className="inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8H14M14 8L8 2M14 8L8 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
