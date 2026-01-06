import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma  from "@/lib/prisma";
import { organization } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
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