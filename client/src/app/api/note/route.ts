import { dbConnection } from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { notesIndex } from "@/lib/pincone";
import NotesModel from "@/models/notesModel";
import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to MongoDB outside of request handlers
mongoose.connect(dbConnection)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection failed:", err));



export async function POST(Request: any) {
  try {
    const { title, content } = await Request.json();
    const {userId} = auth();

    if (!title || !content || !userId) {
      return NextResponse.json("Please fill all fields", { status: 400 });
    }

    // for ai panecone database

    const embedding = await getEmbeddingForNote(title, content)

      const note = await NotesModel.create({
        title,
        content,
        userId
      });

      await notesIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: {userId}
        }
      ])


    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}


export async function GET() {
  try {
    const {userId} = auth();
    const notes = await NotesModel.find({userId});
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}


async function getEmbeddingForNote(title:string, content: string | undefined) {

  return getEmbedding(title + "\n\n" + content ?? "")
  
}