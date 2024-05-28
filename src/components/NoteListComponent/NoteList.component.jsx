import Note from "../NoteComponent/Note.component.jsx";
import CreateNoteModal from "../Modal/CreateNoteModel.component.jsx";
import { useQuery } from "@tanstack/react-query"; //react-query
import InputNote from "../NoteInputComponent/NoteInput.component.jsx";
import { nanoid } from 'nanoid'
import { saveNotes, getNotes } from "../../storage-actions/storage-access.js";
import { useState, useEffect } from 'react';
import "./NoteList.styles.css"
import SearchBar from "../SearchBarComponent/SearchBar.component.jsx";
import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable"

const NoteList = () => {
  const [notes, setNotes]  = useState([]);
  const [filteredNotes, setFilterNotes] = useState([]);
  const [mounted, setMounted] = useState(false)
  const [searchInput, setSearchInput] = useState('');

  //for component to differenciate clicking and dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01
      }
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    )

  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes()
  })

  //Save updated notes to local storage when state changed
  useEffect(()=> {
    saveNotes(notes)
  }, [notes]);

  useEffect(()=> {
    let filtered = [];
    if (searchInput === "") {
      filtered = notes
    }
    else {
      filtered = notes.filter(n => n.text.toLowerCase().includes(searchInput.toLowerCase()))
    }
    setFilterNotes(filtered)
  },[searchInput, notes])

//----------------------------------------------------------------------------------------
  const handleAddNote = async(text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes); 
  }

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  const handleDragEnd = (event) => {
    const {active, over} = event
    if (active.id === over.id) { //if the position of the drag item remain the same 
      return
    }

    setNotes( notes => {
      const originalPos = getNotePos(active.id)
      const newPos = getNotePos(over.id)
      return arrayMove(notes, originalPos, newPos)
    })

  }

  //Helper method to find the task id for handleDragEnd
  const getNotePos = (id) => {
    return notes.findIndex(note => note.id === id)
  }
//----------------------------------------------------------------------------------------
  if (isSuccess) {
    if (mounted === false) {
      setNotes(data);
      setFilterNotes(data);
      setMounted(true);
    }
    //Component must be wrap in DndContext to use the dnd-kit
    return (
      <div className="container">
        <SearchBar setSearch={setSearchInput}> </SearchBar>
        <div className="modal-button"> 
          <CreateNoteModal handleAddNote={handleAddNote}> </CreateNoteModal>
        </div>
        <DndContext 
          onDragEnd={handleDragEnd} 
          collisionDetection={closestCorners}
          sensors={sensors}> 
        
          <div className="notes-list"> 
            <SortableContext items={filteredNotes} strategy={horizontalListSortingStrategy}> 
              {filteredNotes.map(note => (
                <Note key={note.id} note = {note} handleDeleteNote={handleDeleteNote}/>
              ))}
            </SortableContext>
          </div>
          
        </DndContext>
      </div>
    )
  }
}

export default NoteList;