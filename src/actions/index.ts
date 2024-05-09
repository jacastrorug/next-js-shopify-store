"use server"

import { GraphQLClientSingleton } from "@app/graphql"
import { createCartMutation } from "@app/graphql/mutations/createCartMutation";
import { createUserMutation } from "@app/graphql/mutations/createUserMutation";
import { createAccessToken } from "@app/utils/auth/createAccessToken";
import { validateAccessToken } from "@app/utils/auth/validateAccessToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type CartCreateResponse = {
    cartCreate?: {
        cart?: {
            checkoutUrl: string
        }
    }
}

export const handleSignUp = async (formData: FormData) => {
    const formDataObj = Object.fromEntries(formData);
    delete formDataObj["password_confirmation"]
    const variables = {
        input: {
            ...formDataObj,
            phone: "+57" + formDataObj.phone
        }
    }

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const { customerCreate }: any = await graphqlClient.request(createUserMutation, variables)

    const { customerUserErrors, customer } = customerCreate
    if (customer?.firstName) {
        await createAccessToken(formDataObj.email as string, formDataObj.password as string);
        redirect("/store")
    }

}


export const handleSignIn = async (formData: FormData) => {
    const formDataObj = Object.fromEntries(formData);

    const accessToken = await createAccessToken(formDataObj.email as string, formDataObj.password as string);
    if (!accessToken) return null;

    redirect("/store");
}

export const handleCreateCart = async (items: CartItem[]) => {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("accessToken")?.value as string;

    if (!accessToken) redirect("/login");

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const customer = await validateAccessToken();

    const variables = {
        input: {
            buyerIdentity: {
                customerAccessToken: accessToken,
                email: customer.email
            },
            lines: items.map(item => ({
                merchandiseId: item.merchandiseId,
                quantity: item.quantity
            }))
        }
    };

    const { cartCreate }: CartCreateResponse = await graphqlClient.request(createCartMutation, variables);

    return cartCreate?.cart?.checkoutUrl;
}