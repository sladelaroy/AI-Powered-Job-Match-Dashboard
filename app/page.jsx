
import Navbar from "@/components/NavBar";
import JobList from "@/components/JobList";
import Footer from "@/components/Footer";
import { redirect} from "next/navigation";
import {getServerSession} from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
      redirect("/login")
  }
  
  return (
    <>
      <Navbar />
      <div className=" px-10 py-4 md:px-12 lg:px-16">
        <JobList />
      </div>
      <Footer />
    </>
  );
}
