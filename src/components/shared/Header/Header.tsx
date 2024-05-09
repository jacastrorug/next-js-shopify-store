import { validateAccessToken } from "@app/utils/auth/validateAccessToken";
import Link from "next/link";
import styles from "./Header.module.sass";
// import ShoppingCart from "@app/components/shared/ShoppingCart";
import dynamic from "next/dynamic";

const ShoppingCart = dynamic(() => import("@app/components/shared/ShoppingCart"), {ssr: false});

export const Header = async () => {
  const customer = await validateAccessToken();

  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {customer ? (
          <p>Hola, {customer.firstName}!</p>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <ShoppingCart />
      </div>
    </header>
  );
};
