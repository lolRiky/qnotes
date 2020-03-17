import React, { useState, useEffect, useCallback } from 'react';

import { AddCircleOutline, ExpandLessExpandMore} from '@material-ui/icons';

import { TreeView ,Autocomplete } from '@material-ui/lab';
// Remove when treeview will come
import { List, ListItem, ListItemIcon, ListItemText, 
    Divider, makeStyles, TextField, Button, 
    DialogContent, DialogTitle, DialogActions, Dialog, Collapse,
     } from '@material-ui/core';

import LogOut from '../../../shared/LogOut';

import { ArrowDropDown as ArrowDropDownIcon, ArrowRight as ArrowRightIcon, Mail as MailIcon, Delete as DeleteIcon, Label, SupervisorAccount as SupervisorAccountIcon,
Info as InfoIcon, Forum as ForumIcon, LocalOffer as LocalOfferIcon } from '@material-ui/icons';
import NoteTreeItem from '../Note/NoteTreeItem';


const useStyles = makeStyles(theme => ({
    drawerLayout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh'
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
const DrawerBody = React.memo(({ pernamentNotes, newNote }) => {
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState('');
    const [desc, setDesc] = useState('');
    const [remindDate, setRemindDate] = useState(Date);
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
	
    const [treeNotes, setTreeNotes] = useState(null);

    const classes = useStyles();

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleLog = () => {
        const x = treeNotes;
    }

    useEffect(()=>{  
        let result = [];
        let level = { result };
        pernamentNotes.forEach(note => {
            const pathSplit = note.path.split('/');
            pathSplit.reduce((r, name, i, a) => {
                if (!r[name]) {
                    if (i === pathSplit.length - 1) {
				        r[name] = { result: [{name: note.title}] };
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
        // console.log(result);
        // console.clear();
    }, [pernamentNotes]);

    const treeItems = nodes => {
        if(Array.isArray(nodes)) {
                return nodes.map((node, index) => {
                    return (<NoteTreeItem key={index} nodeId={(index*Math.random()).toString()} labelText={node.name} labelIcon={MailIcon}>
                        {Array.isArray(node.children) && node.children.length > 0 ? node.children.map(child => treeItems(child)) : node.name}
                    </NoteTreeItem>);        
            });
        } else {
            for(const prop in nodes) {
                return (<NoteTreeItem key={Math.random()} nodeId={Math.random().toString()} labelText={nodes.name} labelIcon={MailIcon}>
                    {Array.isArray(nodes.children) && nodes.children.length > 0 ? nodes.children.map(child => treeItems(child)) : nodes.name}
                </NoteTreeItem>);
            }
        }           
    }

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
            <div>
                <LogOut style={classes.full} />
            </div>
        </div>
    );
});

export default DrawerBody;