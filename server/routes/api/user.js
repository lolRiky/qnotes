const router = require('express').Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../../database/models/user');
const { registerValidation, loginValidation } = require('../../validators/user');
const verify = require('../../validators/verifyToken');

router.post('/register', async (req, res) => {
    
    // Validate data
    const { error } = registerValidation(req.body);

    // Checks if error exists
    if(error)
        return res.send(error.details[0].message);

    // Query for entered email
    const emailExists = await User.findOne({ email: req.body.email });

    // Checks if email exists
    if(emailExists)
        return res.send({ email: `Email already exists.`});

    // Hashing the password
    // Generate salt for hashing
    const salt = await bcrypt.genSalt(10);

    // TODO: Try hash() nonSync
    // Hash password 
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    // Instance of User to interact with DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        // Save user to DB and save him
        const savedUser = await user.save();

        // Return user's created ID
        res.send({ user: savedUser._id });
    } catch (err) {
        // If any error, send error response
        res.send(err);
    }
});

router.post('/login', async (req, res) => {    

    const { error } = loginValidation(req.body);

    if(error)
        return res.send({ validation: error.details[0].message});

    // Query for entered user
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    // If user doesn't exist
    if(!user)
        return res.send({ crendentials: `Wrong credentials.`});

    // Check for entered password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // Entered password was incorrect
    if(!validPassword)
        return res.send({ crendentials: `Wrong credentials.`});

    // Create and assign a JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header(`auth-token`, token).send(token);
});

router.get('/getUser', verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;