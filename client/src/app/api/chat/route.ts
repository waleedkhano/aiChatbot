import openai, { getEmbedding } from "@/lib/openai";
import { notesIndex } from "@/lib/pincone";
import NotesModel from "@/models/notesModel";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs"

export async function POST(req:Request) {
    try {

        const body = await req.json()
        const messages: ChatCompletionMessage[] = body.messages;

        const messagesTruncated = messages.slice(-6);

        const embedding = await getEmbedding(
            messagesTruncated.map((message) => message.content).join("\n")
        )
        
        const {userId} = auth();

        const vectorQueryResponse = await notesIndex.query({
            vector: embedding,
            topK: 4,
            filter: { userId },
          });
          
          const relevantNotes = await NotesModel.find({
            id: {
              in: vectorQueryResponse.matches.map((match) => match.id),
            },
          });
                    
          const systemMessage: ChatCompletionMessage = {
            role: 'system',
            content:
              'You are an intelligent note-taking app. You answer the user\'s question based on their existing notes.' +
              'The relevant notes for this query are: \n' +
              relevantNotes
                .map(
                  (note) => `Title: ${note.title} \n\n content:\n${note.content}`
                )
                .join('\n\n'),
          };
          
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [systemMessage, ...messagesTruncated]
        })

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.log(error)
        return Response.json({ error: "internal server error"}, {status: 500})
    }
}