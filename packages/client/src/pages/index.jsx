import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/nav";
import Image from "next/image";
import myPic from "../assets/heroimage.png";

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
      <section className="relative py-2">
        <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
          {/* Content */}
          <div className="flex flex-1 flex-col items-center lg:items-start lg:ml-24">
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

      <section className="bg-bookmark-purple text-white py-16 px-2">
          <div className="sm:w-3/4 lg:w-2/4 mx-auto">
            <p className="font-light text-white uppercase text-center mb-8">Developed with love by Ishit</p>
            <h1 className="text-3xl text-white text-center">Feel free to drop an email in case of any queries</h1>
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <input type="text" placeholder="Enter your email address" className="focus:outline-none flex-1 px-2 py-3 rounded-md text-black"></input>
              <button type="button" class="btn bg-bookmark-red hover:bg-bookmark-white hover:text-black">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

        {/* <p className="text-6xl  font-bold font-sans">We Live</p> */}
