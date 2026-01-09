import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaAuth from "@/lib/prisma-auth";
import { organization } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
    database: prismaAdapter(prismaAuth, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    plugins: [ 
        organization(),
        nextCookies()
    ] 
});