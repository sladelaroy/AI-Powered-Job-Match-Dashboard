import connectDB from "@/lib/db";
import User from "@/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();

          if (!email || !password) {
            return null;
          }

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid credentials user");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }

          // Return user object with only necessary fields
          return {
            id: user._id,
            email: user.email,
            name: user.name, // Add other fields as necessary
            skills: user.skills, // Example of another field
          };
        } catch (error) {
          console.log("Authentication error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user details to the token
      if (user) {
        token.id = user.id;
        token.name = user.name; // Add more fields as necessary
        token.skills = user.skills; // Example of another field
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token details to the session
      session.user.id = token.id;
      session.user.name = token.name; // Include additional fields
      session.user.skills = token.skills; // Include additional fields
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
