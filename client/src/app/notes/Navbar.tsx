import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Navbar(){
    return (
        <>
        <div className="p-4 shadow bg-purple-950 text-white">
            <div className="max-w-7x1 m-auto flex flex-wrap gap-3 items-center justify-between">
                <Link href='/notes' className='flex items-center gap-1'>
                    <span className='font-bold text-lg'>CHATBOT</span>
                </Link>
                <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl='/'
                    appearance={{
                        elements:{ avatarBox: { width: "2.5rem", height: "2.5rem"}}
                    }}
                    />
                    <button className='bg-white text-black p-2 rounded-lg'>+ Add Notes</button>
                </div>
            </div>
        </div>
        </>
    )
}