import { GraphQLClientSingleton } from "@app/graphql"
import { customerAccessTokenCreateMutation } from "@app/graphql/mutations/customerAccessTokenCreateMutation";

import { cookies } from "next/headers";

export const createAccessToken = async (email: string, password: string) => {
    const cookiesStore = cookies();

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const { customerAccessTokenCreate }: any = await graphqlClient.request(customerAccessTokenCreateMutation, {
        "email": email,
        "password": password
    });

    console.log(customerAccessTokenCreate);

    if (!customerAccessTokenCreate["customerAccessToken"]) return null;

    const { customerAccessToken: { accessToken, expiresAt } } = customerAccessTokenCreate;

    if (!accessToken) return null;

    cookiesStore.set("accessToken", accessToken, {
        path: "/",
        expires: new Date(expiresAt),
        httpOnly: true,
        sameSite: "strict"
    })

    return accessToken;
}
