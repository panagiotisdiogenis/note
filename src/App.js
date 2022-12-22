import './App.css';
import CreateNote from './CreateNote';
import Labels from './Labels';
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
  const [filter, setFilter] = useState(false);
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
      <div className="px-6 flex justify-between">
        <label className="inline-flex relative cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onClick={() => setFilter(!filter)} />
          <div className={`w-11 h-6 bg-[#333] peer-focus:outline-none ${filter ? 'peer-focus:ring-4 peer-focus:outline-none peer-focus:ring-amber-600 dark:peer-focus:ring-amber-500' : ''}
            rounded-full peer dark:bg-[#333] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-300`}></div>
        </label>
        <Labels />
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
            updateNote={updateNote}
          />)}
      </div>
    </div>
  );
}

export default App;
