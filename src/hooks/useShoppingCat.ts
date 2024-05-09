import { create } from "zustand";

type Store = {
    cart: CartItem[],
    addToCart: (cartItem: CartItem) => void,
    removeCartItem: (cartItem: CartItem) => void
}

const saveItemsToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
}

const getCurrentCart = (): CartItem[] => {
    if (typeof window === "undefined") return []

    const cart = localStorage.getItem("cart")
    if (!cart) return [];

    return JSON.parse(cart)
};

const addToCart = (cartItem: CartItem) => {
    return (state: Store) => {
        const currentCart = state.cart;
        const itemExists = currentCart.find((item) => item.id === cartItem.id);
        const replaceExistingItem = currentCart.map((item) => {
            if (item.id === cartItem.id) {
                return cartItem;
            }

            return item;
        });

        if (itemExists) {
            saveItemsToLocalStorage(replaceExistingItem);
            return ({ cart: replaceExistingItem })
        }

        saveItemsToLocalStorage([...state.cart, cartItem]);
        return ({ cart: [...state.cart, cartItem] });
    }
}

const removeCartItem = (cartItem: CartItem) => {
    return (state: Store) => {
        const currentCart = state.cart;
        const newCart = currentCart.filter((item) => item.id !== cartItem.id);

        saveItemsToLocalStorage(newCart);
        return ({ cart: newCart });
    }
};

export const useShoppingCart = create<Store>()((set) => ({
    cart: getCurrentCart(),
    addToCart: (cartItem) => set(addToCart(cartItem)),
    removeCartItem: (cartItem) => set(removeCartItem(cartItem))
}));
