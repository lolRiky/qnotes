import React, { useState } from 'react';
import { makeStyles, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import EditNote from '../Note/EditNote';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        // paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1
    },
}));

const NoteTreeItem = ({ labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, saveEditNoteHandle, note, ...other }) => {
    const classes = useStyles();

    // Edit Note 
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const openEditNoteHandle = () => {
        if(open !== true) 
           setOpen(!open);           
    }
    
    const closeEditNoteHandle = () => {
        if(open === true) 
            setOpen(!open);
    }


    return (
        <TreeItem onClick={openEditNoteHandle}
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {note ?<EditNote fullScreen={fullScreen}
                            open={open} 
                            closeEditNoteHandle={closeEditNoteHandle}
                            saveEditNoteHandle={saveEditNoteHandle}
                            note={note}
                            /> : null }
                    
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

export default NoteTreeItem;