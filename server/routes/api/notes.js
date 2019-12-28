const router = require('express').Router();

const User = require('../../database/models/user');

// search for this ID: 5e0397beb956cf12888ac00e

router.get('/:id', async (req, res) => {

    
    const result = await User.findOne({
        _id: '5e0397beb956cf12888ac00e'
    });

    console.log(result.notes);
    res.send(result.notes);

});

module.exports = router;