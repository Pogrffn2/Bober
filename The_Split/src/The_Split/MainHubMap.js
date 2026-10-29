import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainHubStyle.css";

export default function MainHub() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredCafe, setHoveredCafe] = useState(false);

  return (
    <main className="split-app">
      {!entered ? (
        <section className="map-screen">
          <header className="topbar">
            <div className="brand">SPLIT<span>®</span></div>
            <div className="top-label">ТОКИО · ЯПОНИЯ</div>
          </header>

          <div className="map-heading">
            <p>НАЙДИ СВОЁ МЕСТО</p>
            <h1>МИР БЛИЖЕ,<br />ЧЕМ КАЖЕТСЯ.</h1>
            <span>Нажми на метку, чтобы открыть бар.</span>
          </div>

          <div className="map">
            <svg
              className="world-map"
              viewBox="0 0 1000 500"
              xmlns="http://w3.org"
              aria-label="Стилизованная карта мира"
            >
              <g fill="#27302f" stroke="#46504c" strokeWidth="1.5">
                <path d="M70 100 L115 65 180 55 220 80 250 75 285 110 265 145 220 150 205 185 170 195 150 165 115 155 90 130Z" />
                <path d="M220 200 L260 215 280 260 260 310 245 355 220 325 210 275 190 235Z" />
                <path d="M410 100 L455 75 500 85 525 110 505 140 470 145 455 170 425 155 400 130Z" />
                <path d="M440 170 L480 165 510 200 500 250 470 310 450 285 430 230Z" />
                <path d="M500 95 L560 65 640 70 700 95 760 90 820 115 865 145 830 170 785 160 750 190 710 180 680 210 640 185 605 200 570 170 530 155Z" />
                <path d="M735 220 L775 215 805 250 790 290 760 315 735 285 720 250Z" />
                <path d="M850 300 L890 285 925 310 915 335 880 345 855 325Z" />
                <path d="M365 65 L385 55 400 70 385 85Z" />
                <path d="M795 185 L810 178 822 190 815 205Z" />
              </g>

              <g fill="#313b38" stroke="#46504c" strokeWidth="1">
                <path d="M817 150 L829 145 838 158 831 175 824 169Z" />
                <path d="M829 177 L840 172 844 187 836 201 830 192Z" />
                <path d="M837 207 L847 201 851 216 843 226Z" />
              </g>

              <circle cx="150" cy="110" r="4.5" fill="#a6aaa1" opacity="0.6" />
              <circle cx="460" cy="115" r="4.5" fill="#a6aaa1" opacity="0.6" />
              <circle cx="250" cy="270" r="4.5" fill="#a6aaa1" opacity="0.4" />
              <circle cx="470" cy="220" r="4.5" fill="#a6aaa1" opacity="0.4" />

              <g className="tokyo-svg-group" onClick={() => setEntered(true)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <circle className="svg-marker-pulse" cx="832" cy="183" r="14" />
                <circle className="svg-marker-dot" cx="832" cy="183" r="5.5" />
              </g>

              <g className="friend-cafe-group" onMouseEnter={() => setHoveredCafe(true)} onMouseLeave={() => setHoveredCafe(false)}>
                <circle className="svg-reyna-pulse" cx="860" cy="305" r="14" />
                <circle className="svg-reyna-dot" cx="860" cy="305" r="5.5" />
              </g>

              {hovered && (
                <foreignObject x="732" y="35" width="200" height="135" className="svg-tooltip-container">
                  <div className="marker-tooltip-inside-svg">
                    <strong>БАР СПЛИТ</strong>
                    <small>ТОКИО, ЯПОНИЯ</small>
                    <span>НАЖМИ, ЧТОБЫ ВОЙТИ ↗</span>
                  </div>
                </foreignObject>
              )}

              {hoveredCafe && (
                <foreignObject x="640" y="160" width="200" height="135" className="svg-tooltip-container">
                  <div className="marker-tooltip-inside-svg reyna-easter-egg">
                    <strong>КАФЕ СПЛИТ</strong>
                    <small style={{ color: "#c181ff" }}>СИДНЕЙ, АВСТРАЛИЯ</small>
                    <span style={{ color: "#a266de" }}>УЮТНОЕ МЕСТО · СКОРО</span>
                  </div>
                </foreignObject>
              )}

              <text x="500" y="460" fill="#77817c" fontSize="11" textAnchor="middle" letterSpacing="5">SPLIT · EST. 2025</text>
            </svg>
          </div>

          <footer className="map-footer">
            <span>35° 41′ С.Ш. · 139° 41′ В.Д.</span>
            <span>ОДНА ТОЧКА. ОДНА ИСТОРИЯ.</span>
          </footer>
        </section>
      ) : (
        <section className="bar-screen">
          <nav className="bar-nav">
            <button className="back-button" onClick={() => setEntered(false)}>← НАЗАД К КАРТЕ</button>
            <div className="brand">SPLIT<span>®</span></div>
          </nav>

          <div className="bar-content">
            <p className="eyebrow">ТОКИО · ЯПОНИЯ · ОТКРЫТО ДО ПОЗДНА</p>
            <h1>БАР<br /><span>СПЛИТ.</span></h1>
            <p className="bar-description">
              Место, где город замедляется.<br />
              Тёплый свет, хорошие разговоры<br />
              и вечер, который не хочется заканчивать.
            </p>

            <button className="enter-button" onClick={() => navigate("/DrinkMenu")}>
              ВОЙТИ В БАР <span>↗</span>
            </button>

            <div className="bar-details">
              <div><small>АДРЕС</small><p>Токио, Япония</p></div>
              <div><small>АТМОСФЕРА</small><p>Тёплый свет · Спокойный вечер</p></div>
              <div><small>ВРЕМЯ</small><p>До последнего гостя</p></div>
            </div>
          </div>

          <div className="bar-stamp">S<br />P<br />L<br />T</div>
        </section>
      )}
    </main>
  );
}
