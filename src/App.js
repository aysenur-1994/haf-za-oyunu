import { useEffect, useState } from "react";
import "./App.css";
import TekKart from "./components/TekKart";

const cardImages = [
  { src: "/img/galata.jpg", matched: false }, //default olarak false ve iki kart eşit olursa true olacak
  { src: "/img/orta-koy.jpg", matched: false },
  { src: "/img/cami.jpg", matched: false },
  { src: "/img/cat.jpg", matched: false },
  { src: "/img/kiz-kulesi.jpg", matched: false },
  { src: "/img/balat.jpg", matched: false },
];

function App() {
  const initializeState = () => {
    return JSON.parse(localStorage.getItem("highestScoresss"));
  };
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [match, matchedCards] = useState(0);
  const [bestScore, setBestScore] = useState(initializeState);
  const [choiceOne, setChoiceOne] = useState(null); //Kullanici 1.karta basinca setChoiceOne o karti alacak ve guncelliyecek
  const [choiceTwo, setChoiceTwo] = useState(null); //Kullanici 2.karta basinca setChoiceTwo o karti alacak ve guncelliyecek
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (match === 6) {
      const highScore = Math.min(turns, bestScore);
      setBestScore(highScore);
      setBestScore(turns);
    } else {
      console.log("false");
    }
  }, [turns]);
  useEffect(() => {
    localStorage.setItem("highestScoresss", JSON.stringify(bestScore));
  });
  useEffect(() => {
    const data = localStorage.getItem("highestScoresss");
    if (data) {
      setBestScore(JSON.parse(data));
    }
  }, [bestScore]);
  // if (setWon === true) {
  //   const highScore = Math.min(turns, bestScore);
  //   setBestScore(highScore);
  //   localStorage.setItem("bestScore", highScore);
  // }

  //Kartlari karistir
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })); //Her karta ozel bir id veriyoruz
    //kartlari karistir

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards); //Karistirlmis kartlari eksi kartlarin yerine getir
    setTurns(0); //Restart basinca sira numarasini sifirlasin
  };

  //Secenegi isle
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    //Choice 1 boşsa setChoice bir değer bekleycek ve bu şekilde setChoiceTwo çalişmayacak
    //Choice 2 boş değilse setChioseTwo çalşacak ve değer bekleycek
  };
  // iki kart arası karşılaştırmak
  useEffect(() => {
    //Sayfa çalşınca çalışacak
    if (choiceOne && choiceTwo) {
      setDisabled(true); //Karşılaşmayı yaparken kullanıcı başka kart seçmesin
      //hem 1.seçenek hem 2.seçenek değeri varsa çünkü ikisinin değeri olmazsa karşılaştırmak istemeyiz
      if (choiceOne.src === choiceTwo.src) {
        matchedCards((preMatch) => {
          return preMatch + 1;
        });

        //VE 1.seçeneğin fotoğraf kaynağı 2.ye eşitse
        setCards((prevCards) => {
          return prevCards.map((card) => {
            //Her iki karta tiklarsan
            if (card.src === choiceOne.src) {
              //kartlar kaynağı eşitse
              return { ...card, matched: true }; //yeni obje yapıp kart değerlerini ekleyip ama matched false tan true dönecek
            } else {
              //değilse kart objesini deiğişmeden geri getir
              return card;
            }
          });
        });
        resetTurn(); //Sıfırla
      } else {
        // Değilse
        setTimeout(() => resetTurn(), 1000); //Bir saniye sonra sıfırla
      }
    }
  }, [choiceOne, choiceTwo]);

  //secenekleri sıfırla ve sıra numarasını artttır
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false); //Karşılaşma bittikten sonra kullanıcı kart seçme imkanı var
  };
  //Oyunu Otomatik olarak çalıştırma fonkisyonu
  useEffect(() => {
    shuffleCards();
  }, []);
  // useEffect(() => {
  //   // eslint-disable-next-line
  //   // eslint-disable-next-line
  // }, [cards]);
  return (
    <div className="App">
      <h1>Ayşe Nur Hafıza Oyunu</h1>

      <div className="kart-grid">
        {cards.map((card) => (
          <TekKart
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            hide={card.matched} //Eşleşen Kartlar Ekrandan Kayıp Olsun
            //3 Senaryo var:
            //1. Birinci kartı seçince flipped class aktif olsun
            //2. Seçtiğimz 1.kart 2.ye eşitse ikinci de aktif olsun
            //3. Kullanıcı önceden iki kart bulduysa flipped class aktif kalsın
            disabled={disabled}
          /> //Props koyduk
        ))}
      </div>

      <div className="bilgi">
        <p>Sıra: {turns}</p>
        <p>Bulunan: {match}</p>
        <p>En iyi Skor: {bestScore}</p>
        <button onClick={shuffleCards}>Yeni Oyun</button>
      </div>
    </div>
  );
}

export default App;
