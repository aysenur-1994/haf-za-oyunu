import React from "react";
import "./TekKart.css";

//Kart Component

export default function TekKart({
  card,
  handleChoice,
  flipped,
  disabled,
  hide,
}) {
  //Cards props app.js ten cagirdik

  const handleClick = () => {
    if (!disabled) {
      //Kartları karşılaştırma yapmadığı sürece kartları işle
      handleChoice(card);
    }
  };

  return (
    <div className={`kart ${hide ? "hide" : ""}`} hide={hide}>
      <div className={flipped ? "flipped" : ""}>
        <img className="on" src={card.src} alt="kart onu" />

        <img
          className="arka"
          src="/img/cover2.jpg"
          onClick={handleClick}
          alt="kart arkasi"
          flipped={flipped}
        />
      </div>
    </div>
  );
}
