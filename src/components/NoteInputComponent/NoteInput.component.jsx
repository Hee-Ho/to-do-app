import { useState } from "react";
import "./NoteInput.styles.css"

const InputNote = ({handleClose, handleAddNote}) => {
  const [noteText, setNoteText] = useState('');
  const characterLimit = 200;

  const handleChange = (event) => {
    setNoteText(event.target.value);
  }

  const handleSaveclick = () => {
    if (noteText.trim().length > 0) { //trim removes white spaces
      handleAddNote(noteText);
      setNoteText('');
      handleClose();
    }
  }

  return (
      <div className="input-container">
        <div className="input-note"> 
          <textarea rows = "8" cols="10" placeholder="Type to add new note..."
          onChange={handleChange} value={noteText}> 
          </textarea>
          <div className="footer">
            <small> {characterLimit - noteText.trim().length} characters remaining...</small>
            <button className="save" onClick={handleSaveclick}> Save </button>
          </div>
        </div>
      </div>
    )
}

export default InputNote;