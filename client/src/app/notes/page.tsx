import Note from '@/components/Note';
import axios from 'axios';

interface Note {
  title: string;
  content: string;
}

async function getData<Note>() {
  const res = await fetch('http://localhost:3000/api/note')
  return res.json();
}

export default async function NotesPage() {

  const notes = await getData();

  return (
    <>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((item: Note, index: number) => (
          <Note key={index} title={item.title} content={item.content} />
        ))

        }
      </div>

    </>
  )
}
