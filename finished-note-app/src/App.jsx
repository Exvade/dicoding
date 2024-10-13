import { useState } from 'react';
import ActiveNote from './Components/ActiveNote';
import ArchievedNote from './Components/ArchievedNote';
import CreateNote from './Components/CreateNote';
import Header from './Components/Header';
import { getInitialData } from './data/index.js';

export default function App() {
  const [cardData, setCardData] = useState(getInitialData());
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreate = (newNote) => {
    setCardData((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleDelete = (id) => {
    const updatedNotes = cardData.filter((note) => note.id !== id);
    setCardData(updatedNotes);
  };

  const handleArchive = (id) => {
    const updatedNotes = cardData.map((note) =>
      note.id === id ? { ...note, archived: true } : note
    );
    setCardData(updatedNotes);
  };

  const handleUnarchive = (id) => {
    const updatedNotes = cardData.map((note) =>
      note.id === id ? { ...note, archived: false } : note
    );
    setCardData(updatedNotes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <CreateNote onCreate={handleCreate} />
      <ActiveNote
        cardData={cardData}
        onDelete={handleDelete}
        onArchive={handleArchive}
        searchQuery={searchQuery}
      />
      <ArchievedNote
        cardData={cardData}
        onDelete={handleDelete}
        onUnarchive={handleUnarchive}
      />
    </>
  );
}
