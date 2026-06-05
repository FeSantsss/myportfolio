import "../../assets/hero.css";
import { Marquee } from "../Marquee";

export function Hero() {
  return (
    <section className="container-hero">
      <h1 className="title-hero">
        Hi, I'm <br />
        <span className="highlight" translate="no">
          Felipy <br /> Santos
        </span>
      </h1>
      <div className="details-hero">
        <p className="description-hero">
          I build fast, scalable web applications with Next.js, TypeScript, and
          Spring Boot.
        </p>
        <div className="my-details">
          <div className="detail-item detail-item-work">
            <div className="circle-open"></div>
            <p className="detail-work">available for work</p>
          </div>
          <div className="detail-item">
            <p className="detail-locate">Based in PE, Brazil</p>
          </div>
          <div className="detail-item detail-item-goal">
            <p className="detail-goal">creative and minimalist</p>
          </div>
        </div>
      </div>
      <div className="arrow-icon">↗</div>

      <Marquee />
    </section>
  );
}
