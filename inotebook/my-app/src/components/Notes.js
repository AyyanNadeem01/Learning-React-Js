import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    const { showAlert } = props;
    const [note, setNote] = React.useState({ id: "", etitle: "", edescription: "", etag: "default" });
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getAllNotes();
        }
        else {
            props.showAlert("Please login to continue", "danger");
            window.location.href = "/login";
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Update Note
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Update Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Title"
                                        value={note.etitle}
                                        onChange={onChange}
                                        minLength={5} maxLength={20}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        placeholder="Text"
                                        value={note.edescription}
                                        onChange={onChange}
                                        minLength={5} maxLength={100}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        placeholder="Text"
                                        value={note.etag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Your Notes</h2>
            <div className="row my-3">
                <div className="container mx-2">
                    {notes.length === 0 ? (
                        <p>No notes to display</p>
                    ) : (
                        notes.map((note) => (
                            <div className="col-md-4" key={note._id}>
                                <Noteitem note={note} showAlert={showAlert} updatenote={updatenote} />
                            </div>
                        ))
                    )}
                </div>
            </div>

        </>
    );
};

export default Notes;
