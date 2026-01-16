/*import { useEffect, useState } from "react";

type View = "prompt" | "conversation" | "detail";
type Topic =
  | "budget"
  | "dates"
  | "airline"
  | "destination"
  | "hotel"
  | "weather";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SPLASH_FADE_AT = 3000;
const SPLASH_HIDE_AT = 3500;

function App() {
  const [view, setView] = useState<View>("prompt");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [isOrbitPaused, setOrbitPaused] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isSplashFading, setSplashFading] = useState(false);

  /* 🔥 AJOUT CHAT 
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const selectedQuestions = selectedTopics.map(
    (topic) => topicQuestions[topic]
  );

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

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/agent/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.answer ?? "Je n'ai pas compris votre demande.",
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Une erreur est survenue lors de la communication avec le serveur.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
              <h2 className="features-title">Un large choix de destinations</h2>
              <div className="feature-chips" aria-label="Fonctionnalites">
                <span>Filtrer par type</span>
                <span>Afficher les emplacements</span>
                <span>Prévision météorologique</span>
                <span>Choix d'hôtels</span>
              </div>
              <div className="Texte">
                <p>Découvrez des destinations de rêve adaptées à vos envies et
                  préférences. Que vous recherchiez des plages paradisiaques,
                  des aventures en montagne ou des escapades culturelles, Travelia
                  vous guide vers le voyage parfait.
                </p>
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
            <section className="prompt-card">
              <h1>Mon conseiller de voyage</h1>

              <ul className="question-list">
                {chatMessages.length === 0 && (
                  <li>Posez votre question pour commencer.</li>
                )}
                {chatMessages.map((msg, index) => (
                  <li key={index}>
                    <strong>
                      {msg.role === "user" ? "Vous" : "Travelia"} :
                    </strong>{" "}
                    {msg.content}
                  </li>
                ))}
              </ul>

              <div className="prompt-input">
                <label htmlFor="prompt-text">Votre message</label>
                <textarea
                  id="prompt-text"
                  placeholder="Ex : 7 jours au Portugal en mai, budget moyen."
                  rows={4}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      sendMessage();
                    }
                  }}
                />
                <button
                  className="primary"
                  type="button"
                  onClick={sendMessage}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyse en cours..." : "Envoyer"}
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
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2025 Travelia</span>
          <span>Votre assistant de voyage intelligent</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
*/

import { useEffect, useState } from "react";

type View = "prompt" | "conversation" | "detail";
type Topic =
  | "budget"
  | "dates"
  | "airline"
  | "destination"
  | "hotel"
  | "weather";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type FaqItem = { q: string; a: string };

const FAQ_LEFT: FaqItem[] = [
  {
    q: "Comment Travelia trouve-t-il des prix de vols ?",
    a: "Quand tu demandes des vols ou un prix, Travelia déclenche l’outil “Flights” qui récupère des données en temps réel sur Kayak à partir des codes aéroports (IATA) et de la période indiquée.",
  },
  {
    q: "Comment Travelia estime-t-il les prix d’hôtels ?",
    a: "Quand tu demandes un hôtel/logement, Travelia déclenche l’outil “Hotels” (Kayak Stays) et récupère un prix minimum et une moyenne indicative sur la période choisie.",
  },
  {
    q: "Pourquoi Travelia me demande parfois des précisions ?",
    a: "Pour être fiable : s’il manque une ville de départ, une destination, ou des dates/mois, Travelia te demande de préciser avant de lancer une recherche.",
  },
  {
    q: "Les données sont-elles réelles ?",
    a: "Oui : le prototype récupère des données publiques en temps réel via scraping (météo, vols, hôtels). Aucun service payant n’est utilisé.",
  },
];

const FAQ_RIGHT: FaqItem[] = [
  {
    q: "Quand Travelia utilise sa base de connaissances ?",
    a: "Pour les informations statiques comme la meilleure période, le climat général et des conseils. S’il a déjà l’info, il n’appelle pas d’outil.",
  },
  {
    q: "Quand Travelia appelle des outils (MCP) ?",
    a: "Pour les données dynamiques : météo actuelle, prix de vols et prix d’hôtels. Il décide d’abord, puis lance l’outil correspondant.",
  },
  {
    q: "Pourquoi Travelia ne répond pas aux questions hors voyage?",
    a: "Parce qu’il est spécialisé dans la planification de voyage. Les questions hors périmètre sont refusées poliment pour rester cohérent et fiable.",
  },
  {
    q: "Quelles destinations sont supportées dans la démo ?",
    a: "Le prototype supporte une liste de destinations de démonstration (ex : Paris, Lisbonne, Rome, Madrid, Barcelone, Bangkok).",
  },
];

function FaqSection() {
  return (
    <section className="faq">
      <div className="faq-header">
        <h2>FAQ</h2>
        <p>
          Questions fréquentes sur Travelia (vols, hôtels, météo, périmètre et
          fonctionnement).
        </p>
      </div>

      <div className="faq-grid">
        <div className="faq-col">
          {FAQ_LEFT.map((item, idx) => (
            <details className="faq-item" key={`l-${idx}`}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>

        <div className="faq-col">
          {FAQ_RIGHT.map((item, idx) => (
            <details className="faq-item" key={`r-${idx}`}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const SPLASH_FADE_AT = 3000;
const SPLASH_HIDE_AT = 3500;

function App() {
  const [view, setView] = useState<View>("prompt");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [isOrbitPaused, setOrbitPaused] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isSplashFading, setSplashFading] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const selectedQuestions = selectedTopics.map(
    (topic) => topicQuestions[topic]
  );

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

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/agent/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.answer ?? "Je n'ai pas compris votre demande.",
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Une erreur est survenue lors de la communication avec le serveur.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
              <h2 className="features-title">Un large choix de destinations</h2>
              <div className="feature-chips" aria-label="Fonctionnalites">
                <span>Recherche de vols</span>
                <span>Meilleures périodes pour voyager</span>
                <span>Prévision météorologique</span>
                <span>Choix d'hôtels</span>
              </div>
              <div className="Texte">
                <p>
                  Découvrez des destinations de rêve adaptées à vos envies et
                  préférences. Que vous recherchiez des plages paradisiaques,
                  des aventures en montagne ou des escapades culturelles, Travelia
                  vous guide vers le voyage parfait.
                </p>
              </div>
              <div className="destination-grid">
                <article className="destination-card">
                  <img src="/chine.jpg" alt="Chine" />
                  <span className="destination-name">Chine</span>
                </article>
                <article className="destination-card">
                  <img src="/bresil.jpg" alt="Bresil" />
                   <span className="destination-name">Brésil</span>
                </article>
                <article className="destination-card">
                  <img src="/suisse.jpg" alt="Suisse" />
                   <span className="destination-name">Suisse</span>
                </article>
                <article className="destination-card">
                  <img src="/londres.jpg" alt="Londres" />
                   <span className="destination-name">Londres</span>
                </article>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="conversation">
          <div className="conversation-grid">
            <section className="prompt-card">
              <h1>Mon conseiller de voyage</h1>

              <ul className="question-list">
                {chatMessages.length === 0 && (
                  <li>Posez votre question pour commencer.</li>
                )}
                {chatMessages.map((msg, index) => (
                  <li key={index}>
                    <strong>
                      {msg.role === "user" ? "Vous" : "Travelia"} :
                    </strong>{" "}
                    {msg.content}
                  </li>
                ))}
              </ul>

              <div className="prompt-input">
                <label htmlFor="prompt-text">Votre message</label>
                <textarea
                  id="prompt-text"
                  placeholder="Ex : 7 jours au Portugal en mai, budget moyen."
                  rows={4}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      sendMessage();
                    }
                  }}
                />
                <button
                  className="primary"
                  type="button"
                  onClick={sendMessage}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyse en cours..." : "Envoyer"}
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
      {view === "prompt" && <FaqSection />}
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2025 Travelia</span>
          <span>Votre assistant de voyage intelligent</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
