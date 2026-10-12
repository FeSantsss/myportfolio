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
      {/* A data fica numa linha só; abaixo de 360px ela desce para baixo do cargo */}
      <div className="mt-3 flex flex-col items-start gap-1 px-1.5 text-xs min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between min-[360px]:gap-3">
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
        <div className="shrink-0 pl-12 min-[360px]:pl-0">
          <p className="whitespace-nowrap opacity-80 uppercase">{props.date}</p>
        </div>
      </div>
    </>
  );
}
