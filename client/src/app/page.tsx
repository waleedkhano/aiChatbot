import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import Link from 'next/link'



export default function Home() {

  const { userId } = auth();
  if(userId) redirect('/notes');

  return (
    <>
    <main className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="flex items-center gap-4">
      <span className='font-bold text-4xl lg:text-5xl'> <span className='text-purple-950 text-5xl lg:text-6xl'>AI.</span> CHATBOT</span>
      </div>
      <p className="text-center max-w-prose ">
      Welcome to our AI Chatbot, your intelligent companion for seamless communication and assistance. Powered by advanced artificial intelligence,  
     </p>
     <button className=' bg-purple-950 p-3 text-white rounded-lg'>
      <Link className='px-3.5	' href='/notes'>
      Open
      </Link>
     </button>
    </main>
    </>
  )
}
