import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase"

const appContext = createContext()

const Provider = ({ children }) => {

    const [data, setData] = useState([])
    const [noteIndex, setNoteIndex] = useState("");
    const [currentNote, setCurrentNote] = useState({});


    useEffect(() => {
        getData()
    }, [])

    const setNote = (note) => {
        if (note.id === undefined) {
            setNoteIndex("")
        } else {
            setNoteIndex(note.id)
        }
    }

    const closeNote = () => {
        setNoteIndex("")
    }

    const noteUpdate = (id, note) => {
        if (id && note && note.text.length >= 1) {
            firebase
                .firestore()
                .collection('data')
                .doc(id)
                .set(note)
            getData()
        }
    }

    const newNote = (title) => {
        firebase
            .firestore()
            .collection('data')
            .doc()
            .set({
                title,
                text: "",
            })
        return firebase
            .firestore()
            .collection('data')
            .where("title", "==", title)
            .get()
            .then(doc => doc.forEach(_doc => {
                const note = _doc.data()
                note["id"] = _doc.id
                setNote(note)
            }))
    }

    const getData = () => {

        firebase
            .firestore()
            .collection("data")
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data["id"] = _doc.id
                    return data
                })
                setData(notes)
            })
    }

    const deleteNote = (note) => {
        firebase
            .firestore()
            .collection('data')
            .doc(note.id)
            .delete()
    }

    const changeTitle = (note, title) => {
        firebase
            .firestore()
            .collection('data')
            .doc(note.id)
            .update({
                text: note.text,
                title: title
            })
    }

    useEffect(() => {
        if (data.length >= 1) {
            data.forEach(_note => {
                if (_note.id === noteIndex) {
                    setCurrentNote(_note)
                }
            })
        }
    }, [noteIndex])

    return (
        <appContext.Provider value={{
            data,
            noteIndex,
            setNote,
            closeNote,
            currentNote,
            noteUpdate,
            deleteNote,
            newNote,
            changeTitle
        }} >
            {children}
        </appContext.Provider>
    )
}

const Consumer = appContext.Consumer;

export { appContext, Provider, Consumer }
