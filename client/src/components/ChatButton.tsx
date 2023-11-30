import { useState } from "react";
import Chatbox from "./Chatbox";

export default function ChatButton() {

    const [chatboxOpen, setChatboxOpen] = useState(false)
    const handler = () => {
        setChatboxOpen(!chatboxOpen)
    }

    return (
        <>
            <button className="bg-white text-black p-2 rounded-lg" onClick={handler}>
                AI Chat
            </button>
            <Chatbox open={chatboxOpen} />
        </>
    )

}