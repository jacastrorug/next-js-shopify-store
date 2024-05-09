import { ProductView } from "@app/components/product/ProductView";
import { getProducts } from "@app/services/shopify/products";
import { Metadata } from "next";
import { redirect, useParams, useSearchParams } from "next/navigation";

interface ProductPageProps {
  searchParams: {
    id: string;
  };
}

export async function generateMetadata({
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  const id = searchParams.id;
  const products = await getProducts(id);
  const product = products[0];

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const id = searchParams.id;
  const products = await getProducts(id);

  if(!id) {
    redirect("/store");
    return null;
  }
  return <ProductView product={products[0]} />;
}
