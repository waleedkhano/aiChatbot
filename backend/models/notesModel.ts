import mongoose, { Schema, Document } from "mongoose";

export interface INotes extends Document {
    title: string;
    content?: string;
    userId?: string;
    createTime: Date;
    updateTime: Date;
}

const notesSchema = new Schema<INotes>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        userId: {
            type: String,
        },
        createTime: {
            type: Date,
            default: Date.now,
        },
        updateTime: {
            type: Date,
            default: Date.now,
        },
    }
);

const NotesModel = mongoose.models.Notes || mongoose.model<INotes>("Notes", notesSchema);

export default NotesModel;
