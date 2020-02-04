import React, { useState, useContext, useEffect } from 'react';
import "./sidebar.css";
import SidebarElement from './SidebarElement/SidebarElement';
import { appContext } from '../../context';

const Sidebar = () => {
    const { data, setNote, noteIndex, closeNote, deleteNote, newNote, changeTitle } = useContext(appContext)

    const [isNewNote, setIsNewNote] = useState(false);
    const [title, setTitle] = useState("")

    const openNote = () => {
        if (title.length >= 1) {
            newNote(title)
            setIsNewNote(false);
            setTitle("")
        }
        else {
            alert("Title is empty")
        }
    }

    const close = () => {
        closeNote();
    }

    return (
        <div className="sidebar" onClick={() => closeNote()}>
            {
                noteIndex !== "" ? <button onClick={close}>Close</button> : <button onClick={() => setIsNewNote(!isNewNote)}>{isNewNote ? 'Cancel' : 'New Note'}</button>
            }
            {
                isNewNote ?
                    <div className='sidebar__newNote'>
                        <p>Title</p>
                        <input className="sidebar__newNote-input" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        <button onClick={openNote} type="submit" className="sidebar__newNote-submit">Create</button>
                    </div>
                    : null
            }

            {
                data.length >= 1 ? data.map(note => (
                    <SidebarElement note={note} setNote={setNote} key={note.id} noteIndex={noteIndex} deleteNote={deleteNote} changeTitle={changeTitle} />
                )) :
                    null
            }

        </div >
    )
}

export default Sidebar
