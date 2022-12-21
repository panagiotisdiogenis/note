import './App.css';
import CreateNote from './CreateNote';
import Note from './Note';
import { useState, useEffect } from 'react';
import { db } from './firebase-config.js';
import { collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

function App() {

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, 'notes');

  const createNote = async (newNote) => {
    const timestamp = serverTimestamp();
    await addDoc(notesCollectionRef, { text: newNote, createdAt: timestamp, favorite: false })
  }

  const updateNote = async (id, favorite) => {
    const noteRef = doc(db, 'notes', id);
    updateDoc(noteRef, { favorite: !favorite })
      .then(respoonse => {
        console.log(respoonse)
      })
      .catch(err => console.log(err.message));
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

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 mx-auto">
        <CreateNote createNote={createNote} />
        {notes.map((note, i) => <Note key={note.id} id={note.id} note={note.text} favorite={note.favorite} timestamp={note.createdAt} deleteNote={deleteNote} updateNote={updateNote} />)}
      </div>
    </div>
  );
}

export default App;
