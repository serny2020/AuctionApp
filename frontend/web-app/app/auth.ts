import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: process.env.ID_URL,
            authorization: { params: { scope: 'openid profile auctionApp' } },
            idToken: true
        } as OIDCConfig<Omit<Profile, 'username'>>),
    ],
    callbacks: {
        async authorized({ auth }) {
            return !!auth;
        },
        async jwt({ token, account, profile }) {
            //   console.log({ token, user, account, profile })
            if (account && account.access_token) {
                token.accessToken = account.access_token; // Store the access token in the session
            }
            if (profile) {
                token.username = profile.username;
            }
            return token;
        },
        async session({ session, token, user }) {
            console.log({ session, token, user })
            if (token) {
                session.user.username = token.username;
                session.accessToken = token.accessToken
            }
            return session;
        }

    }
})