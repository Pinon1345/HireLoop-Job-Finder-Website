import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);

await client.connect(); // or ensure the client is connected

const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,

    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        process.env.BETTER_AUTH_URL,
    ],

    emailAndPassword: {
        enabled: true,
    },

    database: mongodbAdapter(db, {
        client,
    }),

    // Implement ROLE

    user: {
        additionalFields: {
            role: {
                default: "seeker",
            }
        }
    }

});