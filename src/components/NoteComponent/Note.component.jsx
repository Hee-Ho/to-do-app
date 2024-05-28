import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import "./Note.styles.css"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Note = ({note, handleDeleteNote}) => {
  let {id, text, date} = note;
  const {attribute, listeners, setNodeRef, transform, transition} = useSortable({id})

  //Style for dragging
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref = {setNodeRef} {...attribute} {...listeners} style = {style} className="note"> 
      <span> {text} </span>
      <div className="footer"> 
        <small> {date} </small>
        <MdDeleteForever className="delete-icon" size='1.3em' onClick={() => {handleDeleteNote(id)}}/>
      </div>
    </div>
  );
};

export default Note