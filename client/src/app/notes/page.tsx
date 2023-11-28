import Note from "@/components/Note";
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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((item: Note, index: number) => (
          <Note key={index} title={item.title} content={item.content}/>
        ))
        
      }
      </div>
    </>
  );
}
