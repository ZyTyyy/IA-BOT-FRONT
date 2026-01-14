import { useEffect, useState } from "react";

type View = "prompt" | "conversation" | "detail";
type Topic =
  | "budget"
  | "dates"
  | "airline"
  | "destination"
  | "hotel"
  | "weather";

const SPLASH_FADE_AT = 3000;
const SPLASH_HIDE_AT = 3500;

function App() {
  const [view, setView] = useState<View>("prompt");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [isOrbitPaused, setOrbitPaused] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isSplashFading, setSplashFading] = useState(false);

  const topicQuestions: Record<Topic, string> = {
    budget: "Quel budget souhaitez-vous consacrer a votre voyage ?",
    dates: "Quelles dates ou quelle periode souhaitez-vous ?",
    airline: "Avec quelle compagnie voulez-vous partir ?",
    destination: "Quelle destination voulez-vous explorer ?",
    hotel: "Combien de personnes voyagent et quel prix d'hotel visez-vous ?",
    weather: "Vous preferez un pays chaud ou froid, quel climat souhaitez-vous ?",
  };

  const toggleTopic = (topic: Topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const selectedQuestions = selectedTopics.map((topic) => topicQuestions[topic]);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setSplashFading(true);
    }, SPLASH_FADE_AT);

    const hideTimer = window.setTimeout(() => {
      setSplashVisible(false);
    }, SPLASH_HIDE_AT);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="app">
      <nav className="top-nav" aria-label="Menu principal">
        <div className="nav-inner">
          <div className="nav-brand">
            <img src="/logo%20voyage%20.png" alt="Logo Travelia" />
            <span>Travelia</span>
          </div>
          <div className="nav-actions">
            <button
              className={`nav-link ${view === "prompt" ? "is-active" : ""}`}
              type="button"
              onClick={() => setView("prompt")}
            >
              Accueil
            </button>
            <button
              className={`nav-link ${view !== "prompt" ? "is-active" : ""}`}
              type="button"
              onClick={() => setView("conversation")}
            >
              Mon conseiller voyage
            </button>
          </div>
        </div>
      </nav>
      {isSplashVisible && (
        <section className={`splash ${isSplashFading ? "splash--fade" : ""}`}>
          <div className="splash-inner">
            <img
              className="splash-logo"
              src="/logo%20voyage%20.png"
              alt="Logo Travelia"
            />
            <h1 className="splash-title">TRAVELIA</h1>
            <p>On planifie, on raisonne, vous profitez.</p>
          </div>
        </section>
      )}

      {view === "prompt" ? (
        <main className="prompt">
          <section className="home" aria-labelledby="home-title">
            <div className="home-media">
              <img src="/bulle.png" alt="Voyage Travelia" />
            </div>
            <div className="home-copy">
              <h1 id="home-title">
                <span className="home-line home-line--one">
                  Moins d’organisation,
                </span>
                <span className="home-line">plus d’évasion.</span>
              </h1>
              <p className="lead">
                Travelia crée le voyage qui vous ressemble.
              </p>
              <button
                className="primary"
                type="button"
                onClick={() => setView("conversation")}
              >
                C'est parti
              </button>
            </div>
          </section>

          <section className="benefits" aria-labelledby="benefits-title">
            <div className="benefits-inner">
              <h2 id="benefits-title">Pourquoi Travelia ?</h2>
              <div className="benefit-grid">
                <article className="benefit-card">
                  <img src="/fusee.png" alt="Fusee" />
                  <h3>Vous gagnez un temps fou</h3>
                  <p>
                    Travelia analyse, compare et organise tout pour vous.
                  </p>
                </article>
                <article className="benefit-card">
                  <img src="/cerveau.png" alt="Cerveau" />
                  <h3>Il réfléchit vraiment pour vous</h3>
                  <p>
                    Travelia raisonne, contextualise et vous propose des choix
                    intelligents selon vos envies, votre budget et votre style de
                    voyage.
                  </p>
                </article>
                <article className="benefit-card">
                  <img src="/smile.png" alt="Sourire" />
                  <h3>Vous profitez, tout simplement</h3>
                  <p>Moins de stress, moins de doutes, plus de plaisir.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="destinations" aria-label="Destinations">
            <div className="destinations-inner">
              <h2 className="features-title">Des fonctionnalités puissantes</h2>
              <div className="feature-chips" aria-label="Fonctionnalites">
                <span>Filtrer par type</span>
                <span>Afficher les emplacements</span>
                <span>Prévision météorologique</span>
                <span>Choix d'hôtels</span>
              </div>
              <div className="destination-grid">
                <article className="destination-card">
                  <img src="/chine.jpg" alt="Chine" />
                </article>
                <article className="destination-card">
                  <img src="/bresil.jpg" alt="Bresil" />
                </article>
                <article className="destination-card">
                  <img src="/suisse.jpg" alt="Suisse" />
                </article>
                <article className="destination-card">
                  <img src="/londres.jpg" alt="Londres" />
                </article>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="conversation">
          <div className="conversation-grid">
            <section className="prompt-card" aria-labelledby="prompt-title">
              <div>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => setView("conversation")}
                  aria-hidden={view !== "detail"}
                  disabled={view !== "detail"}
                >
                  Retour
                </button>
                <p className="eyebrow">Prompt IA</p>
                <h1 id="prompt-title">
                  Votre assistant personnel de voyage
                </h1>
                <p className="lead">
                  {view === "detail"
                    ? "Selectionnez une ou plusieurs icones a droite."
                    : "Selectionnez une icone a droite pour personnaliser le prompt."}
                </p>
              </div>
              <ul className="question-list" aria-label="Questions personnalisees">
                {selectedQuestions.length > 0 ? (
                  selectedQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))
                ) : (
                  <li>Choisissez une ou plusieurs icones pour demarrer.</li>
                )}
              </ul>
              <div className="prompt-input">
                <label htmlFor="prompt-text">Votre reponse</label>
                <textarea
                  id="prompt-text"
                  name="prompt-text"
                  placeholder="Exemple : 7 jours en Italie, budget moyen, rythme equilibre."
                  rows={4}
                />
                <button className="primary" type="button">
                  Mettre a jour le trajet
                </button>
              </div>
            </section>
            <section className="map-card" aria-label="Carte">
              <div className="map-frame">
                <div className={`orbit ${isOrbitPaused ? "orbit--paused" : ""}`}>
                  <div className="orbit-center">
                    <button
                      className="orbit-center-button"
                      type="button"
                      onClick={() => setView("prompt")}
                    >
                      <img src="/logo%20voyage%20.png" alt="Logo Travelia" />
                    </button>
                  </div>
                  <div className="orbit-spin">
                    <div className="orbit-ring" />
                    <button
                      className="orbit-dot dot-1"
                      type="button"
                      aria-pressed={selectedTopics.includes("budget")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("budget");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/argent.png"
                          alt="Budget"
                        />
                      </span>
                    </button>
                    <button
                      className="orbit-dot dot-2"
                      type="button"
                      aria-pressed={selectedTopics.includes("destination")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("destination");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/emplacement.png"
                          alt="Destination"
                        />
                      </span>
                    </button>
                    <button
                      className="orbit-dot dot-3"
                      type="button"
                      aria-pressed={selectedTopics.includes("airline")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("airline");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/avion.png"
                          alt="Vols"
                        />
                      </span>
                    </button>
                    <button
                      className="orbit-dot dot-4"
                      type="button"
                      aria-pressed={selectedTopics.includes("dates")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("dates");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/calendrier.png"
                          alt="Dates"
                        />
                      </span>
                    </button>
                    <button
                      className="orbit-dot dot-5"
                      type="button"
                      aria-pressed={selectedTopics.includes("hotel")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("hotel");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/Hotel.png"
                          alt="Hotel"
                        />
                      </span>
                    </button>
                    <button
                      className="orbit-dot dot-6"
                      type="button"
                      aria-pressed={selectedTopics.includes("weather")}
                      onPointerDown={() => setOrbitPaused(true)}
                      onPointerUp={() => setOrbitPaused(false)}
                      onPointerLeave={() => setOrbitPaused(false)}
                      onPointerCancel={() => setOrbitPaused(false)}
                      onClick={() => {
                        toggleTopic("weather");
                        setView("detail");
                      }}
                    >
                      <span className="orbit-icon-wrap">
                        <img
                          className="orbit-icon"
                          src="/Weather.png"
                          alt="Meteo"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
