"use client";

import { FaShoppingCart } from "react-icons/fa";

import { handleCreateCart } from "@app/actions";
import { useShoppingCart } from "@app/hooks/useShoppingCat";
import { useState } from "react";
import styles from "./ShoppingCart.module.sass";
import { ShoppingCartItem } from "./ShoppingCartItem";

const ShoppingCart = () => {
  const { cart } = useShoppingCart();
  const hasItems = cart.length > 0;

  const [isBuying, setIsBuying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!hasItems) return;

    setIsOpen(!isOpen);
  };

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const checkOutURL = await handleCreateCart(cart) || "/store";
      window.localStorage.removeItem("cart");
      window.location.href = checkOutURL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.ShoppingCart}>
      {hasItems && (
        <span className={styles.ShoppingCart__counter}>{cart.length}</span>
      )}
      <button className={styles.ShoppingCart__cart} onClick={handleOpen}>
        <FaShoppingCart />
      </button>
      {isOpen && hasItems && (
        <section className={styles.ShoppingCart__items}>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button
            onClick={handleBuy}
            className={styles.ShoppingCart__buyButton}
            disabled={isBuying}
          >
            Buy
          </button>
        </section>
      )}
    </div>
  );
};

export default ShoppingCart;
