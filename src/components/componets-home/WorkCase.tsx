import Image from "next/image";
import styles from "../../assets/workCase.module.css";

interface WorkCaseProps {
  id: number;
  imageSrc: string;
  data: string;
  title: string;
  description: string;
  stack?: string[];
}

export async function WorkCase() {
  const response = await fetch(
    "http://felipysantos-snowy.vercel.app/json-workcase/works.json",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    return <div>Erro ao carregar os dados do projeto.</div>;
  }

  const projects: WorkCaseProps[] = await response.json();

  if (!projects) return null;

  return (
    <div className={styles.workCaseContainer}>
      {projects.map((project) => (
        <div key={project.id} className={styles.cardWorkCase}>
          <div className={styles.cardWorkCaseContent}>
            <span className={styles.cardWorkCaseId}>{`0${project.id}`}</span>
            <span className={styles.cardWorkCaseData}>{project.data}</span>
            <h3 className={styles.cardWorkCaseTitle}>{project.title}</h3>
            <p className={styles.cardWorkCaseDescription}>
              {project.description}
            </p>
            {project.stack && project.stack.length > 0 && (
              <div className={styles.cardWorkCaseStack}>
                {project.stack.map((item, index) => (
                  <span key={index} className={styles.cardWorkCaseStackItem}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.cardWorkCaseImageContainer}>
            {project.imageSrc && (
              <Image
                src={project.imageSrc}
                alt={project.title}
                width={500}
                height={300}
                loading="lazy"
                className={styles.cardWorkCaseImage}
              />
            )}
            <div className={styles.cardWorkCaseImageOverlay}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8H14M14 8L8 2M14 8L8 14"
                  stroke="#1a1712"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
