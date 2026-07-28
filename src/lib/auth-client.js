import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { authAdditionalFields } from "./auth-schema";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [
        adminClient(),
        inferAdditionalFields({
            user: authAdditionalFields,
        }),
    ],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;