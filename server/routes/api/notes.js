const router = require('express').Router();

const User = require('../../database/models/user');
const { registerValidation, loginValidation } = require('../../validators/user');
const verify = require('../../validators/verifyToken');

router.post('/', verify, async (req, res) => {
    
    // Get post data and user
    const { body: { title, path, desc, tag, remindDate }, user } = req;

    // Fetch the usser
    const dbUser = await User.findById(user._id);
    
    // Create a note
    dbUser.notes.push({
        title: title,
        desc: desc,
        tag: tag,
        path: path,
        remindDate: remindDate
    });

    // Save note
    const saveddbUser = await dbUser.save();
    
    res.sendStatus(201);
});

router.post('/check', verify, async (req, res) => {
    
    const { body: { id }, user } = req;

    const dbUser = await User.findById(user._id);

    dbUser.notes.forEach(note => {
        if(note._id == id)
            note.check = !note.check
    });

    await dbUser.save();

    res.sendStatus(200);
});

router.post('/save', verify, async(req, res) => {
    // Get user and body with note id
    const { body: { id, newDesc }, user } = req;

    if(!id || !newDesc)
        res.send({ validation: 'Bad body' });

    // Get the user
    const dbUser = await User.findById(user._id);

    dbUser.notes.forEach(note => {
        if(note._id == id)
            return note.desc = newDesc;
    })

    await dbUser.save();
    res.sendStatus(200);
});

router.post('/delete', verify, async (req, res) => {
    
    // Get user and body with note id
    const { body, user } = req;
    
    // Get the user
    const dbUser = await User.findById(user._id);

    // Desired note will be filtered out
    const notes = await dbUser.notes.filter(x => x._id != body.id);

    // Replace notes
    dbUser.notes = notes;

    // Save the user
    const saveddbUser = await dbUser.save();
    
    // Everything went fine
    res.status(200);
});

router.get('/', verify, async (req, res) => {
    
    const { user: { _id } } = req;

    const dbUser = await User.findById(_id);

    res.send(dbUser.notes);    
});

router.get('/:id', async (req, res) => {
    
    console.log(req);
    
    

    res.send('hi');

});

module.exports = router;