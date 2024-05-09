import { GraphQLClientSingleton } from "@app/graphql";
import { customerName } from "@app/graphql/queries/customerName";
import { cookies } from "next/headers";


export const validateAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient()

    const response = await graphqlClient.request<any>(customerName, {
        customerAccessToken: accessToken
    });

    if (!response.customer) return null;

    console.log(response.customer)
    return response.customer;
}