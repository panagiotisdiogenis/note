import './App.css';
import CreateNote from './CreateNote';
import Labels from './Labels';
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

  const updateLikes = async (id) => {
    const likesRef = doc(db, 'likes', id);
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
      setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
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
  }, [filter]);

  return (
    <div className="container mx-auto my-10">
      <div className="px-6 flex justify-between">
				<div className='flex justify-center items-center'>
					<label className="inline-flex relative cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" onClick={() => setFilter(!filter)} />
						<div className={`w-11 h-6 bg-[#333] peer-focus:outline-none ${filter ? 'peer-focus:ring-4 peer-focus:outline-none peer-focus:ring-amber-600 dark:peer-focus:ring-amber-500' : ''}
							rounded-full peer dark:bg-[#333] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
							after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-300`}></div>
					</label>
				</div>
				<Like id={likes.id} likes={likes.count} updateLikes={updateLikes} />
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
			<Labels />
    </div>
  );
}

export default App;
