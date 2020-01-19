import React from 'react';

import { Dialog as MatDialog, DialogTitle, Divider, DialogContent } from "@material-ui/core";

const Dialog = (props) => {

    return (
        <MatDialog
         open={props.open}
         onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <Divider />
            <DialogContent>
                {props.children}
            </DialogContent>
        </MatDialog>
    );

}

export default Dialog;