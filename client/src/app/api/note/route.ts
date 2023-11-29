import { dbConnection } from "@/lib/db";
import NotesModel from "@/models/notesModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to MongoDB outside of request handlers
mongoose.connect(dbConnection);



export async function POST(Request: any) {
  try {
    const { title, content } = await Request.json();
    if (!title || !content) {
      return NextResponse.json("Please fill all fields", { status: 400 });
    }

    const note = await NotesModel.create({
      title,
      content,
    });

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}


export async function GET() {
  try {
    const notes = await NotesModel.find();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}