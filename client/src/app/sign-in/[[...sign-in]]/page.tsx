import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatboot sign Up"
}

export default function SignInPage(){
    return(
        <div className=" flex h-screen items-center justify-center">
            <SignIn appearance={{ variables: {colorPrimary: "rgb(59 7 100)"}}}/>
        </div>
    )
}