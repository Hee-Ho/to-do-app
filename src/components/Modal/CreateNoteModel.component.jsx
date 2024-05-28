import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./CreateNoteModal.styles.css"
import InputNote from '../NoteInputComponent/NoteInput.component';

const CreateNoteModal = ({handleAddNote}) => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <InputNote handleClose={handleClose} handleAddNote={handleAddNote}> </InputNote>
      </Modal>
    </>
  );
}

export default CreateNoteModal;