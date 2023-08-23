import NextAuth from "next-auth"
import SessionProvider from "next-auth/react"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SessionProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)