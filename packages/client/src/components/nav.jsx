import { useState } from 'react'
import Link from 'next/link'



function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <Link href='/'>
                <a className="text-xl font-semibold no-underline">LOGO</a>
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl font-medium my-4" href="/about" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    About
                </a>
                <a className="text-xl font-normal my-4" href="/contact" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Contact
                </a>
            </div>  
        </div>
    )
}

export default function Navbar() {

    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link href='/'>
                <a className="text-2xl no-underline font-semibold">LOGO</a>
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <Link href="/">
                        <a className='font-bold text-lg mx-4 no-underline'>
                            Sign Up
                        </a>
                    </Link>
                    <Link href="/">
                        <a className='mx-4 text-lg font-bold no-underline'>
                            LogIn
                        </a>
                    </Link>
                    <Link href="/">
                        <a className='mx-4 text-lg font-bold no-underline'>
                            About Us
                        </a>
                    </Link>
                    <Link href="/">
                        <a className='mx-4 text-lg font-bold no-underline'>
                            Contact Us
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}