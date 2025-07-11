import React, { useEffect, useState } from 'react';
import PdfViewer from './PdfViewer';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Notes.css';
import Loading from './Loading';
import API_BASE_URL from '../config/api';

const Notes = () => {
  const [notesLink, setNotesLink] = useState(null);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const notesData = useSelector(state => state.notesData);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const isFreeNote = notesData.freeNotes.some(note => note.id == noteId);
    console.log(notesData);
    const isPurchasedNote = userData.purchases.notes.some(id => noteId == id);

    if (!isFreeNote && !isPurchasedNote) {
      navigate('/');
      return;
    }

    fetch(`${API_BASE_URL}/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setNotesLink(data.link);
      })
      .catch((error) => console.error('Error fetching note:', error));
  }, [noteId, notesData.freeNotes, userData.purchases.notes, navigate]);

  return (
    <div className="notes-container">
      {notesLink ? (
        <PdfViewer link={notesLink} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Notes;
