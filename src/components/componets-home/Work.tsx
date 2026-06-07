import styles from "../../assets/work.module.css";
import { WorkCase } from "./WorkCase";

export function Work() {
  return (
    <section id="work" className={styles.containerWork}>
      <span id="subtitles" className={styles.subtitleWork}>
        II - SELECTED PROJECTS
      </span>
      <h2 className={styles.titleWork}>work</h2>

      <WorkCase />
    </section>
  );
}
