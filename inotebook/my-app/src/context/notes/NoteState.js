import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const [notes, setNotes] = useState([]);

    // Fetch All Notes
    const getAllNotes = async () => {
        const response = await fetch(
            `http://localhost:5000/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );
        const json = await response.json();
        setNotes(json);
    };

    //Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":  localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        setNotes(notes.concat(json));
 };

    //Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(
            `http://localhost:5000/api/notes/deletenote/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );

        const json = await response.json();

        // Remove the note locally from state
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(
            `http://localhost:5000/api/notes/updatenote/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":   localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        const json = await response.json();
        //Logic to edit in client
        const newNotes = notes.map((note) => {
            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
            return note;
        });
        setNotes(newNotes);
    };
    return (
        <noteContext.Provider
            value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}
        >
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
