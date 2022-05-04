import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/nav";
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
      <div className="mt-56 ml-16">
        <p className="text-6xl headd font-bold font-sans">We Live</p>
      </div>
    </div>
  );
}