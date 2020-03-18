import React, { useState, useEffect } from 'react';

import { AddCircleOutline, Folder as FolderIcon, Description as DescriptionIcon, ArrowDropDown as ArrowDropDownIcon, ArrowRight as ArrowRightIcon } from '@material-ui/icons';

import { useTheme, useMediaQuery } from '@material-ui/core';

import { TreeView ,Autocomplete } from '@material-ui/lab';
// Remove when treeview will come
import { List, ListItem, ListItemIcon, ListItemText, 
    Divider, makeStyles, TextField, Button, 
    DialogContent, DialogTitle, DialogActions, Dialog, Collapse,
     } from '@material-ui/core';

import NoteTreeItem from '../Note/NoteTreeItem';
import EditNote from '../Note/EditNote';



const useStyles = makeStyles(theme => ({
    drawerLayout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden'
    },
    full: {
      width: '100%'
    },
    extendedIcon: {
        margin: theme.spacing(1)
    },

    root: {
      height: 264,
      minWidth: 240,
      maxWidth: 240,
    },
}));

const tags = ['No category', 'School', 'Work', 'Life', 'Personal', 'Business'];

// Body of Drawer/Navigation
const DrawerBody = ({ pernamentNotes, newNote, saveEditNoteHandle }) => {
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState('');
    const [desc, setDesc] = useState('');
    const [remindDate, setRemindDate] = useState(Date);
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
	
    const [treeNotes, setTreeNotes] = useState(null);
    const classes = useStyles();

    // Edit Note 
    const theme = useTheme();
    const [openEditNote, setOpenEditNote] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const openEditNoteHandle = () => {
        setOpenEditNote(true);
    }
    
    const closeEditNoteHandle = () => {
        setOpenEditNote(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // node.children['0'] > 0
    const handleLog = () => {
        console.log(treeNotes[0].children[0].children['0'].children == undefined);
    }

    useEffect(()=>{  
        let result = [];
        let level = { result };
        pernamentNotes.forEach(note => {
            const pathSplit = note.path.split('/');
            pathSplit.reduce((r, name, i, a) => {
                if (!r[name]) {
                    if (i === pathSplit.length - 1) {
				        r[name] = { result: [{name: note.title, desc: note.desc, _id: note._id, title: note.title}] };
                        r.result.push({ name, children: r[name].result });
                    }
                    else {
                        r[name] = { result: [] };
                        r.result.push({ name, children: r[name].result });
                    }
                }
        
                return r[name];
            }, level)
        });
        setTreeNotes(result);
        console.log(result);
        // console.clear();
    }, [pernamentNotes]);

    const submitNewNote = e => {
        e.preventDefault();
        newNote(path, desc, remindDate, tag, title);
        setPath('');
        setDesc('');
        setRemindDate(Date);
        setTag('');
        setTitle('');
        setOpen(!open);
    }

    const treeItems = nodes => {
        if(nodes){
            // console.log(`fileeee`, nodes);
            return nodes.map((node, index) =>{
                return (
                <NoteTreeItem style={{paddingLeft: '8px'}} key={index} nodeId={(Math.random()).toString()} labelText={node.name} labelIcon={FolderIcon}>
                    {Array.isArray(node.children[0].children) ? 
                    node.children.map(child => treeItems([child])) :
                    <>
                     <NoteTreeItem onClick={openEditNoteHandle} key={Math.random()} nodeId={Math.random().toString()} 
                     labelText={node.children[0].name} labelIcon={DescriptionIcon} />
                    <EditNote fullScreen={fullScreen}
                        open={openEditNote} 
                        closeEditNoteHandle={closeEditNoteHandle}
                        saveEditNoteHandle={saveEditNoteHandle}
                        note={node.children[0]}
                        />
                    </>}
                </NoteTreeItem>)
            });
        }

        // if(Array.isArray(nodes)) {
        //     console.log('yeah');
        //         return nodes.map((node, index) => {
        //             return (<NoteTreeItem key={index} nodeId={(Math.random()).toString()} labelText={node.name} labelIcon={FolderIcon}>
        //                 {Array.isArray(node.children) ? node.children.map(child => treeItems(child)) : null}
        //             </NoteTreeItem>);        
        // });
        // } else {
        //     for(const prop in nodes) {
        //         console.log(prop)
        //         return (
        //         <NoteTreeItem style={{paddingLeft: '8px'}} key={Math.random()} nodeId={Math.random().toString()} labelText={nodes.name} labelIcon={FolderIcon}>
        //             {Array.isArray(nodes.children) ?
        //              nodes.children.map(child => treeItems(child)) :
        //               <NoteTreeItem key={Math.random()} nodeId={Math.random().toString()} labelText={nodes.name} labelIcon={DescriptionIcon} /> }
        //         </NoteTreeItem>);
        //     }
        // }           
    };

    return (
        <div className={classes.drawerLayout}>
            {/* <button onClick={handleLog}>Log</button> */}
            <div>
                <List>
                    <ListItem button key='New Note' onClick={handleClickOpen}>
                        <ListItemIcon><AddCircleOutline/></ListItemIcon>
                        <ListItemText primary='New Note'/>
                    </ListItem>
                </List>

                <Dialog onClose={handleClose} open={open} title='New Note'>
                    
                    <DialogTitle>New Note</DialogTitle>
                    <form onSubmit={ e => submitNewNote(e)}>
                        <DialogContent>
                            <TextField autoFocus name='title' onChange={e => setTitle(e.target.value)} value={title} label='Title' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                            <TextField name='desc' onChange={e => setDesc(e.target.value)} value={desc} multiline={true} rows='8' label='Content' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                            <TextField name='remindDate' onChange={e => setRemindDate(e.target.value)} type='date' value={remindDate} label='Date to get reminded' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                            <Autocomplete
                            onChange={e => setTag(e.target.value)}
                            options={tags}
                            getOptionLabel={(option) => {
                                setTag(option);
                                return option;
                            }}
                            renderInput={params => (
                                <TextField {...params} name='tag'  label='Tag' fullWidth InputLabelProps={{
                                    shrink: true
                                }}/>
                            )}/>
                            <TextField name='path' onChange={e => setPath(e.target.value)} value={path} label='Path' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button type='submit' variant='contained' color='primary'>Create a note</Button>
                        </DialogActions>
                    </form>

                </Dialog>

                <Divider />
            
				<TreeView
					className={classes.root}
					defaultCollapseIcon={<ArrowDropDownIcon />}
					defaultExpandIcon={<ArrowRightIcon />}
					// defaultEndIcon={<div style={{ width: 24 }} />}
					>

					{treeItems(treeNotes)}
					
					</TreeView>
            </div>
        </div>
    );
};

export default DrawerBody;