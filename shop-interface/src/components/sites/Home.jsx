import React, { useRef } from "react";
import "./Home.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function Home() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="home-container">
        <header className="home-header">
          <h1>👗 Witaj w Naszym Sklepie Modowym! 👔</h1>
          <p>
            Twoje miejsce na odkrywanie najnowszych trendów i ponadczasowych
            klasyków. 🌟
          </p>
        </header>
        <section className="featured-products">
          <h2>
            <Link to="/products" className="link-text">
              🌈 Wybrane Produkty
            </Link>
          </h2>

          <p>
            Zachwyć się naszymi starannie wyselekcjonowanymi kolekcjami, które
            pozwolą Ci wyrazić swój indywidualny styl.
          </p>
        </section>
        <section className="about-us">
          <h2>
            <Link to="about" className="link-text">
              📖 O Nas
            </Link>
          </h2>
          <p>
            Nasza misja to dostarczanie wysokiej jakości odzieży, która łączy w
            sobie najnowsze trendy z wygodą noszenia. Nasza marka powstała z
            pasji do mody i chęci dostarczenia naszym klientom najlepszych
            produktów.
          </p>
        </section>

        <section className="latest-news">
          <h2>
            <span onClick={scrollToForm} className="link-text">
              📰 Najnowsze Wiadomości
            </span>
          </h2>
          <p>
            Bądź na bieżąco z najnowszymi wydarzeniami, promocjami i kolekcjami
            w naszym sklepie. Zapisz się do naszego newslettera, aby nie
            przegapić żadnych nowości!
          </p>
        </section>
      </div>
      <Footer formRef={formRef} />
    </>
  );
}

export default Home;
