import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import NotesModel from "../models/notesModel";


export const postNotes = async (req: Request, res: Response, next: NextFunction) => {

  const { title, content, userId } = req.body;


  if (!title || !content || !userId) {
    return next(new ErrorHandler("Please enter all fields", 400))
  }

  const note = await NotesModel.create({
    title,
    content,
     userId
  });
  res.status(200).json({
    success: true,
    note,
  });

}
export const getNotes = async (req: Request, res: Response, next:NextFunction) => {
  const { userId } = req.query;
  if(!userId){
    return next(new ErrorHandler("Unauthorized User", 400))
  }

  try {
    const notes = await NotesModel.find({userId});

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);
  }

}