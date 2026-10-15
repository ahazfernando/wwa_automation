const clients = [
  { src: "/clientlogo/HurricaneRVLogoBlack.avif", alt: "Hurricane RV", wide: true },
  { src: "/clientlogo/RotaryMBS-Simple_RGB.avif", alt: "Rotary" },
  { src: "/clientlogo/GreatAussieLogo.avif", alt: "Great Aussie" },
  { src: "/clientlogo/CaravanWorksLogo.avif", alt: "Caravan Works", wide: true },
  { src: "/clientlogo/ChatGPT20Image20Jun2062020262007_28_0220AM.avif", alt: "S&R Estate Agents" },
  { src: "/clientlogo/DriveNowLogoD1.avif", alt: "Drive Now" },
  { src: "/clientlogo/EqualizerRVLogo.avif", alt: "Equalizer RV", wide: true },
  { src: "/clientlogo/MalibuCaravans.avif", alt: "Malibu Caravans", wide: true },
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
        <ul className="clients-grid">
          {clients.map((logo) => (
            <li className={logo.wide ? "client-tile is-wide" : "client-tile"} key={logo.alt}>
              <img src={logo.src} alt={logo.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
