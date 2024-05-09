import { env } from "@app/config/env";
import { shopifyUrls } from "./urls";

export const getCollections = async (): Promise<Collection[]> => {
    const response = await fetch(
        `${shopifyUrls.collections.all}`,
        {
            headers: {
                "X-Shopify-Access-Token": env.SHOPIFY_API_KEY,
            },
        }
    );

    const { smart_collections } = await response.json();

    return smart_collections.map(mapCollection);
};


export const getCollectionProducts = async (id: number) => {
    try {
        const response = await fetch(shopifyUrls.collections.products(id), {
            headers: {
                "X-Shopify-Access-Token": env.SHOPIFY_API_KEY,
            },
        });

        const { products } = await response.json();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const mapCollection = (collection: Collection) => ({
    id: collection.id,
    title: collection.title,
    handle: collection.handle
});
