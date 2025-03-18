export { auth as middleware } from "@/app/auth"
 
 export const config = {
     matcher: [
         '/session'
     ],
     pages: {
         signIn: '/api/auth/signin'
     }
 }