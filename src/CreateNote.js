import { useState } from 'react';

function CreateNote({ createNote }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      createNote(input);
      setInput('');
    }

    const handleClick = () => {
      createNote(input);
      setInput('');
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="container bg-[#333] border-[1px] border-neutral-600/75 text-[#aaa] h-64 rounded-xl p-4 mx-auto">
          <div className="h-5/6 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 motion-safe:animate-spin text-amber-300">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg>

          </div>
          <div className='container grid grid-cols-5 h-1/6'>
            <input 
              className="rounded-lg bg-[#222] text-[#eee] col-span-4 outline-none h-1/6 text-xs p-4 w-full placeholder-[#777]"
              placeholder="Write something here... "
              maxLength="200"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              />
              <div className='flex justify-center items-center h-[32px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-500 hover:text-green-500 w-6 h-6 cursor-pointer col-span-1" onClick={() => handleClick()}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
              </div>
          </div>
        </div>
      </form>
    );
  }
  
  export default CreateNote;