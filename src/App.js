import './App.css';
import CreateNote from './CreateNote';
import Note from './Note';
import { useState, useEffect } from 'react';
import { db } from './firebase-config.js';
import { collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

function App() {
  const [filter, setFilter] = useState(true);
  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, 'notes');

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

  useEffect(() => {
    const option = filter ? 'favorite' : 'createdAt';
    const q = query(notesCollectionRef, orderBy(option, "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="container mx-auto my-10">
      <div className="px-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className={filter ? "w-6 h-6 text-amber-300 cursor-pointer" : "w-6 h-6 text-[#aaa] cursor-pointer"} onClick={() => setFilter(!filter)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 mx-auto">
        <CreateNote createNote={createNote} />
        {notes.map((note, i) => <Note key={note.id} id={note.id} note={note.text} favorite={note.favorite} timestamp={note.createdAt} deleteNote={deleteNote} updateNote={updateNote} />)}
      </div>
    </div>
  );
}

export default App;
