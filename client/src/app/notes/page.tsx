'use client'
import React, { useEffect, useState } from 'react';
import Note from '@/components/Note';

interface Note {
  title: string;
  content: string;
}

async function getData(): Promise<Note[]> {
  try {
    const res = await fetch('http://localhost:3000/api/note');
    const data = await res.json();

    // Ensure data is an array
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error('Received data is not an array:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setNotes(data);
    }

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 ? (
          <div className="">You don't have any notes</div>
        ) : (
          notes?.map((item: Note, index: number) => (
            <Note key={index} title={item.title} content={item.content} />
          ))
        )}
      </div>
    </>
  );
}
