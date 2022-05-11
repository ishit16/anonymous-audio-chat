import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/nav";
import Image from "next/image";
import myPic from "../assets/heroImage.webp";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Welcome user<br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <Navbar/>
      {/* Click to sign into your user account <br />
      <button onClick={() => signIn()}>Sign in</button> */}
      <section className="relative">
        <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
          {/* Content */}
          <div className="flex flex-1 flex-col items-center lg:items-start lg:ml-8">
            <h2 className="font-bold headd text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
              WeLive: Always there by your side
            </h2>
            <p className="text-bookmark-grey text-lg  text-center lg:text-left mb-6">
              We live to help you get through the tough phases of your life and make your journey
              a smooth one. Feeling a bit low? Try to have a chat with one of our amazing volunteers
            </p>
            <div className="flex justify-center flex-wrap gap-6">
              <button type="button" className="hover:bg-bookmark-white btn btn-purple font-bold hover:text-black">Login</button>
              <button type="button" className="btn btn-white font-bold hover:bg-bookmark-purple hover:text-white">Signup</button>
            </div>
          </div>
          {/* Image */}
          <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
            <Image
              src={myPic}
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md: w-full md:h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

        {/* <p className="text-6xl  font-bold font-sans">We Live</p> */}
