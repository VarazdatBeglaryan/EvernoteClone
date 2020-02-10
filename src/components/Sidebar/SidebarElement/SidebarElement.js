import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { removeHTMLTags } from '../../../helpers';

const SidebarElement = ({ note, setNote, noteIndex, deleteNote, changeTitle }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isTitleChanging, setIsTitleChanging] = useState(false);
    const [title, setTitle] = useState(note.title)

    useEffect(() => {
        if (note.id !== noteIndex) {
            setIsOpen(false)
        }
    }, [noteIndex])

    const selectNote = (e) => {
        e.stopPropagation();
        if (!isOpen) {
            setIsOpen(true)
            setNote(note)
        } else {
            setIsOpen(false)
            setNote("")
        }
    }

    const deleteCurrentNote = (e, note) => {
        e.stopPropagation();
        deleteNote(note)
        if (note.id === noteIndex) {
            setNote({ id: undefined })
        }
    }


    const titleHandler = (e) => {
        if (e.key == 'Enter') {
            if (title.length <= 0) {
                alert("Title is Empty")
            } else {
                changeTitle(note, title)
                setIsTitleChanging(false)
            }
        }
    }

    return (
        <div onClick={(e) => selectNote(e)} className={noteIndex == note.id ? "active" : "sidebar__element"}>
            <section >
                <div onDoubleClick={() => setIsTitleChanging(true)} className="sidebar__element-title">{isTitleChanging ? <input onKeyPress={e => titleHandler(e)} className="sidebar__element-input" value={title} onChange={e => setTitle(e.target.value)} /> : title}</div>
                <div className="sidebar__element-prev">{removeHTMLTags(note.text.substring(0, 30)) + '...'}</div>
            </section>
            {
                title == "Info" ? null : <div onClick={(e) => deleteCurrentNote(e, note)} className="icon"><FaTrash /></div>
            }
        </div>
    )
}

export default SidebarElement
