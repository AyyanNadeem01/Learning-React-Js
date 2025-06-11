import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const handleClick = (e) => {
        e.preventDefault();
        // Pass title, description, and tag to addNote
        addNote(note.title, note.description, note.tag);
        // Optionally clear the form after adding the note
        setNote({ title: "", description: "", tag: "default" });
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        placeholder="Enter Title"
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        maxLength={20}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Text"
                        value={note.description}
                        onChange={onChange}
                        minLength={5}
                        maxLength={100}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="Text"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
                    ADD Note
                </button>
            </form>
        </div>
    );
}

export default AddNote;
