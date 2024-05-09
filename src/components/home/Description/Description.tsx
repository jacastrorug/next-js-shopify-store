"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import styles from "./Description.module.sass";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,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";

export const Description = () => {
  const [hasBorder, setBorder] = useState(false);

  const handleClick = () => setBorder(!hasBorder);

  const cx = classNames.bind(styles)
  const buttonStyles = cx("Description__button", {
    "Description__button--border": hasBorder,
  });

  console.log(buttonStyles);
  return (
    <section className={styles.Description}>
      <button onClick={handleClick} className={buttonStyles}>
        <div className={styles.Description__image_container}>
          <Image
            src="/images/description.jpeg"
            alt="products marketplace"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
      </button>
      <div className={styles.Description__text}>
        <h2>Bring the future today</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          velit architecto mollitia nisi voluptas ullam excepturi magni
          inventore molestias! Deserunt corporis excepturi veritatis
          consectetur, mollitia aut sunt nisi libero eligendi?
        </p>
      </div>
    </section>
  );
};
