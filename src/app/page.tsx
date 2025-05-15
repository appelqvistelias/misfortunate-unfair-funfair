import Navbar from "../components/Navbar/Navbar";
import style from "./page.module.css";
import Image from "next/image";

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
          <a href="">
            <Image
              src="/img/madame.png"
              width="500"
              height="500"
              alt=""
              className={style.image}
            />
          </a>
          <a href="">
            <Image
              src="/img/calculus.png"
              width="500"
              height="500"
              alt=""
              className={style.image}
            />
          </a>
        </main>
      </section>
    </>
  );
}
