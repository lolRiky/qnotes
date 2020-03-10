import React, { Component, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, TextField } from "@material-ui/core";

const EditNote = ({ fullScreen, open, closeEditNoteHandle, note, saveEditNoteHandle}) => {

    const [newDesc, setNewDesc] = useState('');

    const descChangeHandle = (text) => {
        setNewDesc(text);
    }

    useEffect(()=>{
        setNewDesc(note.desc);
    },[]);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={closeEditNoteHandle}
            className="responsive-dialog-title"
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{note.title}</DialogTitle>
            <DialogContent>
                <textarea onChange={e => descChangeHandle(e.target.value)} value={newDesc} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeEditNoteHandle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={ () => saveEditNoteHandle(note._id, newDesc)} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default EditNote;