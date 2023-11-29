'use client'
import axios from "axios";
import { useUser } from '@clerk/nextjs'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AddNoteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}


export default function DialogBox({ open, setOpen }: AddNoteProps) {
    const { user } = useUser();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content) {
            setError("Error: Please enter all fields");
            return;
        }

        try {
            const postSuccess = await axios.post('api/note', {
                title,
                content,
            });

            if (postSuccess) {
                setTitle('');
                setContent('');
                router.refresh();
                setOpen(false);
                setError(null);
            }
        } catch (error) {
            console.error(error);
            setError("Error occurred while posting the note");
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded w-full max-w-md">
                        <form onSubmit={submitHandler} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 rounded outline-none	 border border-gray-300"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Content"
                                className="w-full h-48 resize-none	outline-none	rounded p-2 border border-gray-300"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {error && <span className="block text-red-600 text-sm h-3">{error}</span>}
                            <button type="submit" className="mt-4 p-3 bg-purple-950 text-white rounded">ADD</button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setError(null); 
                                }}
                                className="mt-4 p-3 bg-red-600 float-right text-white rounded"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
