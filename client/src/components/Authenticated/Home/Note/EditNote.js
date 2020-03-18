import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from "@material-ui/core";

const EditNote = ({ fullScreen, open, closeEditNoteHandle, note, saveEditNoteHandle}) => {

    const [newDesc, setNewDesc] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const descChangeHandle = (text) => {
        setNewDesc(text);
    }

    const titleChangeHandle = (title) => {
        setNewTitle(title);
    }

    useEffect(()=>{
        setNewDesc(note.desc);
        setNewTitle(note.title);
    }, [note.desc, note.title]);

    return (
        <Dialog
            fullScreen={fullScreen}
            disablePortal={true}
            open={open}
            onClose={closeEditNoteHandle}
            className="responsive-dialog-title"
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                <TextField
                    type="text"
                    variant="outlined"
                    onChange={e => titleChangeHandle(e.target.value)}
                    value={newTitle}
                />
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Description"
                    placeholder="Description"
                    multiline
                    variant="outlined"
                    onChange={e => descChangeHandle(e.target.value)} value={newDesc}
                    style={{width: '100%', height: '90% !important'}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeEditNoteHandle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={ () => {saveEditNoteHandle(note._id, newDesc, newTitle); closeEditNoteHandle()}} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default EditNote;