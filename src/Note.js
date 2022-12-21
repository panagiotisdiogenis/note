import { useState } from 'react';

function Note({ note, id, deleteNote, timestamp, updateNote, favorite }) {

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

    const className = "w-6 h-6 hover:text-amber-300 cursor-pointer";

    return (
      <div className="container bg-[#333] border-[1px] border-neutral-600/75 text-[#aaa] text-sm h-64 rounded-xl p-4 break-words first-line:uppercase first-line:tracking-widest
        first-letter:text-3xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left overflow-y-auto hover:border-[#aaa] transition
        duration-700 ease-in-out opacity-100" style={{opacity: deleted ? 0 : 1}}>
        <div className="h-4/5">{note}</div>
        <div className='container grid grid-cols-5 h-1/6'>
          <div className='mt-6 text-xs text-center mx-auto col-span-1 hover:text-red-500 cursor-pointer' onClick={handleClick}>Delete</div>
          <div className="mx-auto invisible xl:visible text-xs col-span-3 text-center mt-6">{getTimeStamp()}</div>
          <div className='mt-4 text-xs text-center mx-auto col-span-1'>
            <svg onClick={() => updateNote(id, favorite)} xmlns="http://www.w3.org/2000/svg" fill={favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={favorite ? `${className} text-amber-300` : className}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  export default Note;