import './App.css';
import CreateNote from './CreateNote';
import Note from './Note';
import { useState, useEffect } from 'react';
import { db } from './firebase-config.js';
import { collection, doc, addDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

function App() {

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, 'notes');

  const createNote = async (newNote) => {
    const timestamp = serverTimestamp();
    await addDoc(notesCollectionRef, { text: newNote, createdAt: timestamp })
  }

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc)
  };

  useEffect(() => {
    const q = query(notesCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(notes)
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 mx-auto">
        <CreateNote createNote={createNote} />
        {notes.map((note, i) => <Note key={note.id} id={note.id} note={note.text} timestamp={note.createdAt} deleteNote={deleteNote} />)}
      </div>
    </div>
  );
}

export default App;
