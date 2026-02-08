import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/User";   // <--- Note the extra ../ here
import connectDB from "../../../../lib/db";  // <--- Note the extra ../ here
import bcrypt from "bcryptjs";

// ... keep the rest of your code ...

// 1. Define the options in a variable and EXPORT it.
// This allows other files (like the Admin API) to use these same security settings.
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        
        // Find user by email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // Check if password matches
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // Add the role to the token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user._id; // It's good to have the ID too
      }
      return token;
    },
    // Add the role to the session (so the frontend can see it)
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is in your .env.local file
};

// 2. Pass the options to NextAuth
const handler = NextAuth(authOptions);

// 3. Export the handler for GET and POST requests
export { handler as GET, handler as POST };