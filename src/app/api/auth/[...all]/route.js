import { auth } from "@/lib/auth"; // Correct path to your auth file
import { toNextJsHandler } from "better-auth/next-js"; // Correct import

export const { POST, GET } = toNextJsHandler(auth);