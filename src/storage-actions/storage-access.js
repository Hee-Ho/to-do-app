export const saveNotes = (notes) => {
  const savedNotes = localStorage.setItem('react-to-do-app', JSON.stringify(notes))
  return savedNotes;
}

export const getNotes = () => { 
  const saveNotes = JSON.parse(localStorage.getItem('react-to-do-app'));
  return saveNotes;
}