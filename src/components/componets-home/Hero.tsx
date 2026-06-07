import styles from "../../assets/hero.module.css";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("../Marquee").then((mod) => mod.Marquee));
export function Hero() {
  return (
    <section className={styles.containerHero}>
      <span id="subtitles" className={styles.subtitleHero}>
        I - FULL-STACK DEVELOPER
      </span>
      <h1 className={styles.titleHero}>
        Hi, I'm <br />
        <span className={styles.highlight} translate="no">
          felipy <br /> santos
        </span>
      </h1>
      <div className={styles.detailsHero}>
        <p className={styles.descriptionHero}>
          I build fast, scalable web applications with Next.js, TypeScript, and
          Spring Boot.
        </p>
        <div className={styles.myDetails}>
          <div className={`${styles.detailItem} ${styles.detailItemWork}`}>
            <div className={styles.circleOpen}></div>
            <p>available for work</p>
          </div>
          <div className={styles.detailItem}>
            <p>Pernambuco, Brazil</p>
          </div>
          <div className={`${styles.detailItem} ${styles.detailItemGoal}`}>
            <p aria-label="creative and minimalist developer">
              creative and minimalist
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className={styles.arrowIcon}>
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
