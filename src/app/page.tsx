import Navbar from "../components/Navbar/Navbar";
import style from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className={style.bodyPage}>
        <header className={style.header}>
          <h1>Welcome to Unfair Funfair</h1>
          <a href="#content">Scroll Down</a>
        </header>
        <main className={style.content} id="content">
          <a href="">
            <img src="/img/madame.png" alt="" />
          </a>
          <a href="">
            <img src="/img/calculus.png" alt="" />
          </a>
        </main>
      </section>
    </>
  );
}
