export function Footer() {
  return (
    <>
      <div className="w-full h-[.5px] mt-3 opacity-40 bg-mybeige max-w-5/6 m-auto mt-20"></div>
      <div className="flex flex-col justify-center items-center w-full font-[montserrat] text-mywhite opacity-50 text-xs mb-10 mt-3.5 md:text-sm md:mt-7">
        <p className="opacity-75" translate="no">
          &copy; 2026 - Felipy Santos - Minimalist Developer
        </p>
        <div translate="no" className="mt-2.5 flex gap-1">
          <p className="opacity-100">God</p>{" "}
          <p className="opacity-70">bless u always</p>
        </div>
      </div>
    </>
  );
}
