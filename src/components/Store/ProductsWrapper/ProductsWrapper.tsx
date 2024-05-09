import { ProductCard } from "../ProductCard";
import styles from "./ProductsWrapper.module.sass";

interface ProductsWrapperInterface {
  products: ProductType[];
}

export const ProductsWrapper = ({ products }: ProductsWrapperInterface) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
