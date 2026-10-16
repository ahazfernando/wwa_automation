const clients = [
  { src: "/clientlogo/HurricaneRVLogoBlack.avif", alt: "Hurricane RV" },
  { src: "/clientlogo/RotaryMBS-Simple_RGB.avif", alt: "Rotary" },
  { src: "/clientlogo/GreatAussieLogo.avif", alt: "Great Aussie" },
  { src: "/clientlogo/CaravanWorksLogo.avif", alt: "Caravan Works" },
  { src: "/clientlogo/ChatGPT20Image20Jun2062020262007_28_0220AM.avif", alt: "S&R Estate Agents" },
  { src: "/clientlogo/DriveNowLogoD1.avif", alt: "Drive Now" },
  { src: "/clientlogo/EqualizerRVLogo.avif", alt: "Equalizer RV" },
  { src: "/clientlogo/MalibuCaravans.avif", alt: "Malibu Caravans" },
] as const;

export default function ClientLogos() {
  return (
    <section className="clients" aria-label="Client logo showcase">
      <div className="clients-inner">
        <div className="clients-head">
          <div>
            <span className="stories-badge">Our client community</span>
            <h2>
              Good company.
              <br />
              Great possibilities.
            </h2>
          </div>
          <p>Organisations we partner with, from local operators to national brands.</p>
        </div>
      </div>
      <div className="clients-marquee" aria-hidden="true">
        <div className="clients-track">
          {[0, 1].map((copy) => (
            <ul className="clients-set" key={copy}>
              {clients.map((logo) => (
                <li className="client-tile" key={`${copy}-${logo.alt}`}>
                  <img src={logo.src} alt="" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((logo) => (
          <li key={logo.alt}>{logo.alt}</li>
        ))}
      </ul>
    </section>
  );
}
