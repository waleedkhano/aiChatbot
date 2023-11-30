import { useChat } from "ai/react";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import { TbMessageChatbot } from "react-icons/tb";

interface AIChatBox {
    open: boolean;
}

export default function Chatbox({ open }: AIChatBox) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
    } = useChat();

    const lastMessage = messages[messages.length - 1]?.role === "user";

    return (
        <div
            className={`bottom-0 text-black right-0 z-10 w-full max-w-[500px] p-1 xl:right-36 fixed`}
        >
            {open && (
                <div className="flex h-[600px] bg-white flex-col rounded bg-background border shadow-xl">
                    <div className="h-full mt-3 px-3 overflow-auto">
                        {messages.map((message) => (
                            <ChatMessage message={message} key={message.id} />
                        ))}
                        {
                            isLoading && lastMessage &&(
                                <ChatMessage
                                message={{
                                    role: "assistant",
                                    content: "Loading..."
                                }}
                                 />
                            )
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                        <input
                            type="text"
                            className="w-full h-10 rounded bg-background outline-none shadow-sm"
                            onChange={handleInputChange}
                            value={input}
                            placeholder="Hey, how can I help you ..."
                        />
                        <button
                            type="submit"
                            className="bg-purple-950 text-white p-2 rounded-lg"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

function ChatMessage({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {
    const { user } = useUser();
    const isAiMessage = role === 'assistant';

    return (
        <div className={`mb-3 flex items-center  ${isAiMessage ? "me-5 justify-start" : "justify-end ms-5"}`}>
            {isAiMessage &&
                <div className="flex">
                    <TbMessageChatbot size={30} className="text-purple-950" />
                    <p className={`whitespace-pre-line rounded-md border border-purple-950 px-3 py-2 bg-background`}>
                        {content}
                    </p>
                </div>
            }
            {
                !isAiMessage && user?.imageUrl &&
                <div className="flex">
                    <p className={`whitespace-pre-line rounded-md border px-3 py-2 bg-purple-950 text-white`}>
                        {content}
                    </p>
                    <img src={user.imageUrl} alt="user Image" width="100px" height="100px" className="ml-2 rounded-full w-10 h-10 object-cover" />
                </div>
            }

        </div>
    );
}

