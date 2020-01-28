const router = require('express').Router();

const User = require('../../database/models/user');
const verify = require('../../validators/verifyToken');

router.post('/', verify, async (req, res) => {
    
    // Get post data and user
    const { body: { title, path, desc, tag}, user } = req;

    // Fetch the usser
    const dbUser = await User.findById(user._id);
    
    // Create a note
    dbUser.notes.push({
        title: title,
        desc: desc,
        tag: tag,
        path: path
    });

    // Save note
    const saveddbUser = await dbUser.save();

    const latest = saveddbUser.notes[saveddbUser.notes.length - 1];
    res.send(latest);
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