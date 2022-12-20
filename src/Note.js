import { useState } from 'react';

function Note({ note, id, deleteNote, timestamp }) {

    const getTimeStamp = () => {
      const t = timestamp && timestamp.seconds * 1000;
      const date = new Date(t);
    
      return date.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }

    const [deleted, setDeleted] = useState(false)

    const handleClick = () => {
      setDeleted(!deleted);
      setTimeout(() => {
        deleteNote(id)
      }, 500);
    }
    return (
      <div className="container bg-[#333] border-[1px] border-neutral-600/75 text-[#aaa] text-sm h-64 rounded-xl p-4 break-words first-line:uppercase first-line:tracking-widest
        first-letter:text-3xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left overflow-y-auto hover:border-[#aaa] cursor-pointer transition
        duration-700 ease-in-out opacity-100" style={{opacity: deleted ? 0 : 1}} onClick={handleClick}>
        <div className="h-4/5">{note}</div>
        <div className="mx-auto text-xs text-center mt-6">{getTimeStamp()}</div>
      </div>
    );
  }

  export default Note;