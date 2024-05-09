import { MainProducts } from "@app/components/home/MainProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future world store!!",
  description: "Welcome to the future world, an ecomerce from other century"
}

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  );
}
