import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatboot sign Up"
}

export default function SignUpPage(){
    return(
        <div className=" flex h-screen items-center justify-center">
            <SignUp appearance={{ variables: {colorPrimary: "rgb(59 7 100)"}}}/>
        </div>
    )
}