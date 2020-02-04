import React, { useContext, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from "../../helpers"
import { appContext } from "../../context"
import 'react-quill/dist/quill.snow.css'
import "./console.css"

const Console = () => {
    const { noteUpdate, currentNote } = useContext(appContext)

    const [text, setText] = useState("");

    useEffect(() => {
        if (currentNote, text) {
            setText(currentNote.text)
        }
    }, [currentNote])

    useEffect(() => {
        update()
    }, [text])

    const update = debounce(() => {
        noteUpdate(currentNote.id, {
            title: currentNote.title,
            text: text
        })
    }, 1500)

    const updateBody = (value) => {
        setText(value)
    }

    return (
        <>
            {
                currentNote.id ? <ReactQuill className="console" value={text || currentNote.text} onChange={value => updateBody(value)}></ReactQuill> : null
            }
        </>
    )
}

export default Console
