import { useState } from 'react';

function CreateNote({ createNote }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      createNote(input);
      setInput('');
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="container bg-[#333] border-[1px] border-neutral-600/75 text-[#aaa] h-64 rounded-xl p-4 mx-auto">
          <div className="h-5/6"></div>
          <input 
            className="rounded-lg bg-[#222] text-[#eee] outline-none h-1/6 text-xs p-4 w-full placeholder-[#777]"
            placeholder="Write something here... "
            maxLength="350"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
        </div>
      </form>
    );
  }
  
  export default CreateNote;