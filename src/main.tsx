
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [hearts, setHearts] = useState<number[]>([]);
  const [playSong, setPlaySong] = useState(false);

  const dodgeNo = () => {
    const padding = 16;
    const buttonWidth = 100;
    const buttonHeight = 50;

    const maxLeft = Math.max(
        padding,
        window.innerWidth - buttonWidth - padding
    );

    const maxTop = Math.max(
        padding,
        window.innerHeight - buttonHeight - padding
    );

    setNoPosition({
      left: padding + Math.random() * (maxLeft - padding),
      top: padding + Math.random() * (maxTop - padding),
    });
  };

  const sayYes = () => {
    setAccepted(true);
    setPlaySong(true);
    setHearts(Array.from({ length: 34 }, (_, index) => index));
  };

  return (
      <main className="page">
        <div className="overlay" />

        <section className="card" aria-live="polite">
          {!accepted ? (
              <>
                <div className="big-heart">💗</div>

                <h1>
                  ¿Quieres ser
                  <br />
                  mi novia?
                </h1>

                <p>Tengo una pregunta muy importante…</p>

                <div className="buttons">
                  <button className="yes" onClick={sayYes}>
                    Sí 💖
                  </button>

                  <button
                      className="no"
                      onMouseEnter={dodgeNo}
                      onTouchStart={(event) => {
                        event.preventDefault();
                        dodgeNo();
                      }}
                      onClick={dodgeNo}
                      style={
                        noPosition
                            ? {
                              position: 'fixed',
                              left: noPosition.left,
                              top: noPosition.top,
                              zIndex: 20,
                            }
                            : undefined
                      }
                  >
                    No 🙃
                  </button>
                </div>

                <div className="tiny">
                  (el gatito está de testigo)
                </div>
              </>
          ) : (
              <>
                <div className="big-heart">💗</div>

                <h1>¡SÍÍÍ! 🥹💖</h1>

                <div className="result">
                  <h2>
                    Grx, me encantas y te vas a casar conmigo 💗
                  </h2>

                  <p>Ahora me perteneces 😌</p>
                  <p>Te quiero :)</p>
                </div>

                <div className="tiny">
                  💞 oficialmente novios (aún falta la pedida en persona) 💞
                </div>

                {playSong && (
                    <div className="song-player">
                      <p>Nuestra canción 🎶</p>

                      <audio
                          src="/cancion.mp3"
                          autoPlay
                          controls
                          onLoadedMetadata={(event) => {
                            event.currentTarget.currentTime = 51;
                            void event.currentTarget.play().catch(() => {
                              // El navegador puede requerir pulsar Play.
                            });
                          }}
                      />
                    </div>
                )}
              </>
          )}
        </section>

        {accepted && (
            <>
              <img
                  className="dancing-cat cat-left"
                  src="/dancing-cat-left.gif"
                  alt="Gatito bailando a la izquierda"
              />

              <img
                  className="dancing-cat cat-right"
                  src="/dancing-cat-right.gif"
                  alt="Gatito bailando a la derecha"
              />
            </>
        )}

        {hearts.map((heart) => (
            <span
                className="floating-heart"
                key={heart}
                style={{
                  left: `${(heart * 37) % 100}%`,
                  animationDelay: `${heart * 0.07}s`,
                }}
            >
          {['💗', '💖', '💕', '💘', '❤️'][heart % 5]}
        </span>
        ))}
      </main>
  );
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
