import Image from "next/image";
import styles from "./page.module.css";
import { Hero } from "@app/components/home/Hero";
import { Description } from "@app/components/home/Description";
import { MainProducts } from "@app/components/home/MainProducts";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Description />
      <MainProducts />
    </main>
  );
}
