import Navbar from "../components/Navbar/Navbar";
import style from "./page.module.css";
import ImageLink from "@/components/ImageLink/ImageLink";

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
            alt="A red-haired fortune teller dressed in an emerald green cloak sits at a dark wooden table. On the table in front of her there are tarot cards, burning candles and a crystal ball. Her red eyes glow and she has an evil smirk on her face."
            className={style.image}
          />
          <ImageLink
            href="/curse-of-calculus"
            src="/img/calculus.png"
            alt="A skeleton dressed in a black cloak, with a book and piece of chalk in his hands. Around him are math equations written in white."
            className={style.image}
          />
        </main>
      </section>
    </>
  );
}
