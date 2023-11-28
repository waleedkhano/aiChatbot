import { auth } from "@clerk/nextjs";
import axios from "axios";

interface Note {
  title: string;
  content: string;
}

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw new Error("userId Undefined");

  const allNotes = await axios.get<{ notes: Note[] }>('http://localhost:5000/api/getnotes',{
    params: { userId },
  });
  const notes = allNotes.data.notes;

  return (
    <>
      <div className="">
        {notes.map((item: Note, index: number) => (
          <div key={index}>
            <p>Title: {item.title}</p>
            <p>Content: {item.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
