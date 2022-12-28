import './App.css';
import { Analytics } from '@vercel/analytics/react';
import Banner from './Banner';
import CreateNote from './CreateNote';
import Footer from './Footer';
import Like from './Like';
import Note from './Note';
import { useState, useEffect } from 'react';
import { db } from './firebase-config.js';
import { 
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

function App() {
	const [input, setInput] = useState("");
  const [filter, setFilter] = useState(false);
  const [notes, setNotes] = useState([]);
  const [likes, setLikes] = useState({});
  const notesCollectionRef = collection(db, 'notes');
  const likesCollectionRef = collection(db, 'likes');

  const createNote = async (newNote) => {
    const timestamp = serverTimestamp();
    await addDoc(notesCollectionRef, { text: newNote, createdAt: timestamp, favorite: false })
  }

  const updateNote = async (id, favorite) => {
    const noteRef = doc(db, 'notes', id);
    updateDoc(noteRef, { favorite: !favorite })
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err.message));
  }

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc)
  };

  const updateLikes = async () => {
    const likesRef = doc(db, 'likes', likes.id);
    updateDoc(likesRef, { count: likes.count + 1 })
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err.message));
  }

  useEffect(() => {
    const option = filter ? 'favorite' : 'createdAt';
    const q = query(notesCollectionRef, orderBy(option, "desc"));
    const unsubscribeNotes = onSnapshot(q, snapshot => {
      setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
				.filter(note => note.text.toLowerCase().includes(input.toLowerCase())))
    });
    const unsubscribeLikes = onSnapshot(likesCollectionRef, snapshot => {
      const { count, id } = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0];
      setLikes(prev => ({ ...prev, count, id }));
    });
    return () => {
      unsubscribeNotes();
      unsubscribeLikes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, input]);

  return (
    <div className="container mx-auto my-10">
			<Analytics />
			<Banner />
      <div className="px-6 flex justify-between">
				<form>   
					<label className="mb-2 text-xs text-gray-900 sr-only text-white">Search</label>
					<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
							</div>
							<input type="search" value={input} onChange={e => setInput(e.target.value)} className="w-[250px] sm:w-[350px] h-[36px] block w-full p-4 pl-10 text-sm bg-[#333] rounded-lg border border-neutral-600/75 focus:border-neutral-600/75 outline-none focus:ring-transparent focus:ring-[0px] placeholder-gray-400 text-white" placeholder="Search..." />
					</div>
				</form>
				<div className='flex justify-center items-center'>
					<label className="inline-flex relative cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" onClick={() => setFilter(!filter)} />
						<div className={`w-11 h-6 bg-[#333] peer-focus:outline-none ${filter ? 'peer-focus:ring-4 peer-focus:outline-none peer-focus:ring-amber-600 dark:peer-focus:ring-amber-500' : ''}
							rounded-full peer dark:bg-[#333] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
							after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-300`}></div>
					</label>
				</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 mx-auto">
        <CreateNote createNote={createNote} />
        {notes.map((note, i) => 
          <Note
						key={note.id}
						id={note.id}
            note={note.text}
            favorite={note.favorite}
            timestamp={note.createdAt}
            deleteNote={deleteNote}
            updateNote={() => updateNote(note.id, note.favorite)}
          />)}
      </div>
			<Footer />
    </div>
  );
}

export default App;
