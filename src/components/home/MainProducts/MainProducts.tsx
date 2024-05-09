import React from "react";
import Image from "next/image";
import styles from "./MainProducts.module.sass";

export const MainProducts = async () => {
  const response = await fetch("http://localhost:3000/api/main_products");
  const { products } = await response.json();

  if (!products) return null;

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: ProductType) => {
          const imageSrc = product.image;
          return (
            <article key={product.id}>
              <p>{product.title}</p>
              <Image src={imageSrc} fill alt={product.title} loading="eager" />
            </article>
          );
        })}
      </div>
    </section>
  );
};
