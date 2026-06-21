export interface IAppProps {
  title: string;
  role: string;
  data: string;
}

export function ExperienceAbout(props: IAppProps) {
  return (
    <>
      <div className="w-full h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      <div className="text-xs flex flex-row justify-between items-center mt-2 px-1.5">
        <div className="flex flex-col items-start">
          <h3 translate="no" className="font-bold text-sm mb-1">
            {props.title} -
          </h3>
          <p className="opacity-70">{props.role}</p>
        </div>
        <div>
          <p className="opacity-80 uppercase">{props.data}</p>
        </div>
      </div>
    </>
  );
}
