import styles from "../../assets/hero.module.css";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("../Marquee").then((mod) => mod.Marquee));
export function Hero() {
  return (
    <section className={styles.containerHero}>
      <h1 className={styles.titleHero}>
        Hi, I'm <br />
        <span className={styles.highlight} translate="no">
          Felipy <br /> Santos
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
            <p>Based in PE, Brazil</p>
          </div>
          <div className={`${styles.detailItem} ${styles.detailItemGoal}`}>
            <p aria-label="creative and minimalist developer">
              creative and minimalist
            </p>
          </div>
        </div>
      </div>
      <div className={styles.arrowIcon}>↗</div>

      <Marquee />
    </section>
  );
}
