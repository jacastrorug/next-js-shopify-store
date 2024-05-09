import { env } from "@app/config/env";
import { shopifyUrls } from "./urls";

export const getProducts = async (id?: string): Promise<ProductType[]> => {
    try {
        const apiURL = id ? `${shopifyUrls.products.all}?ids=${id}` : shopifyUrls.products.all
        const response = await fetch(
            apiURL,
            {
                headers: {
                    "X-Shopify-Access-Token": env.SHOPIFY_API_KEY,
                },
            }
        );

        const { products }: { products: any[] } = await response.json();
        return products.map(mapProducts)
    } catch (error) {
        console.error(error);
        return []
    }

};

export const getMainProducts = async (id?: string): Promise<ProductType[]> => {
    const apiURL = id ? `${shopifyUrls.products.mainProducts}?ids=${id}` : shopifyUrls.products.mainProducts
    const response = await fetch(
        apiURL,
        {
            headers: {
                "X-Shopify-Access-Token": env.SHOPIFY_API_KEY,
            },
            cache: "force-cache",
            next: {
                tags: ["main-products"]
            }
        },
    );
    const { products }: { products: any[] } = await response.json();
    return products.map(mapProducts)
};




const mapProducts = (product: any): ProductType => ({
    id: product.id,
    gql_id: product.variants ? product.variants[0].admin_graphql_api_id : 0,
    title: product.title,
    description: product.body_html,
    price: product.variants ? product.variants[0].price : 0,
    image: product.image.src,
    images: [],
    quantity: product.variants ? product.variants[0].inventory_quantity : 0,
    handle: product.handle,
    tags: product.tags
})