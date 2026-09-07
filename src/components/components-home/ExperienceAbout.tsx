import Image from "next/image";
export interface IAppProps {
  key: string;
  image: string;
  name: string;
  role: string;
  date: string;
}

export function ExperienceAbout(props: IAppProps) {
  return (
    <>
      <div className="text-xs flex flex-row justify-between items-center mt-3 px-1.5">
        <div className="flex items-center gap-2">
          <Image
            alt={props.name}
            src={props.image}
            className="self-center rounded-lg"
            width={40}
            height={40}
          />
          <div className="flex flex-col items-start">
            <h3 translate="no" className="font-bold text-sm mb-1">
              {props.name} -
            </h3>
            <p className="opacity-70">{props.role}</p>
          </div>
        </div>
        <div>
          <p className="opacity-80 uppercase">{props.date}</p>
        </div>
      </div>
    </>
  );
}
