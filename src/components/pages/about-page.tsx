import { Building2, Cpu, Coffee, Settings } from "lucide-react";
import { advantages } from "@/lib/catalog";
import { ContactCTA } from "@/components/site-shell";
import { studioImage } from "@/lib/studio";

const industries = [
  [Building2, "Real Estate"],
  [Cpu, "Technology & Startups"],
  [Coffee, "Hospitality"],
  [Settings, "Facility Solutions"],
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">MEET CLYRA</span>
        <h1>
          We turn business challenges
          <br />
          into opportunities.
        </h1>
        <p>
          Great ideas deserve great execution. We bring the right expertise together to help your business work
          smarter, connect better, and move forward.
        </p>
      </section>
      <img
        src={studioImage}
        width={1536}
        height={1024}
        alt="A bright, collaborative workspace with plants and a shared meeting table"
        className="about-cover"
      />
      <div className="section-inner">
        <section className="about-story">
          <div>
            <span className="eyebrow">OUR MISSION</span>
            <h2>Make progress practical.</h2>
            <p>
              To help ambitious businesses turn their goals into action through clear strategy, thoughtful
              technology, and people who care about the outcome.
            </p>
          </div>
          <div>
            <span className="eyebrow">OUR VISION</span>
            <h2>Better business, connected.</h2>
            <p>
              A future where people, processes, and technology work together seamlessly, giving every business the
              confidence and capability to grow.
            </p>
          </div>
        </section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">INDUSTRY EXPERTISE</span>
            <h2>
              Different industries.
              <br />
              Shared possibilities.
            </h2>
          </div>
        </div>
        <div className="industry-grid">
          {industries.map(([Icon, name]) => (
            <div key={name}>
              <Icon />
              <h3>{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <section className="values-section">
        <div className="section-inner">
          <div className="section-heading">
            <h2>What makes us different.</h2>
          </div>
          <div className="values-grid">
            {advantages.map(([title, text], index) => (
              <div className="value-item" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
