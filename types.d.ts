type ErrorCmpProps = {
    error: Error;
    reset: () => void;
};

type ProductType = {
    id: string;
    gql_id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    images: { src: string }[];
    quantity: number;
    handle: string;
    tags: string;
};

type Collection = {
    id: number;
    title: string;
    handle: string;
}

type CartItem = {
    title: string;
    price: number;
    quantity: number;
    id: string;
    merchandiseId: string;
    image: string;
}
