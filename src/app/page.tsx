import Navbar from "../components/Navbar/Navbar";
import style from "./page.module.css";
import ImageLink from "@/components/ImageLink";

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
          <h2>Pick Your Poison</h2>
          <ImageLink
            href="/madame-misfortune"
            src="/img/madame.png"
            alt="Madame"
            className={style.image}
          />
          <ImageLink
            href="/curse-of-calculus"
            src="/img/calculus.png"
            alt="Calculus"
            className={style.image}
          />
        </main>
      </section>
    </>
  );
}
