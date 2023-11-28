interface NoteProps {
    title: string;
    content: string;
  }
  
  const Note: React.FC<NoteProps> = ({ title, content }) => {
    return (
      <>
        <div className="bg-gray-100 text-center p-4 rounded shadow-md">
      <p className="font-bold text-lg mb-2">{title}</p>
      <p>{content}</p>
    </div>
      </>
    );
  };
  
  export default Note;
  