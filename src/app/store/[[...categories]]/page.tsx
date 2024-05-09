import { ProductsWrapper } from "@app/components/Store/ProductsWrapper";
import {
  getCollectionProducts,
  getCollections,
} from "@app/services/shopify/collections";
import { getProducts } from "@app/services/shopify/products";

interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams?: string;
}

export default async function CategoryPage(props: CategoryProps) {
  const { categories } = props.params;
  let products = [];
  const collections = await getCollections();

  const selectedCollectionId = collections.find(
    (collection) => collection.handle === categories?.[0]
  )?.id;
  if (selectedCollectionId) {
    products = await getCollectionProducts(selectedCollectionId);
  } else {
    products = await getProducts();
  }

  return <ProductsWrapper products={products} />;
}
