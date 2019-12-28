import React from 'react';

import { Dialog, DialogTitle } from "@material-ui/core";

const Dialog = (props) => {

    return (
        <Dialog>
            <DialogTitle>props.title</DialogTitle>
            {props.children}
        </Dialog>
    );

}

export default Dialog;