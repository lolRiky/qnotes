const router = require('express').Router();
const db = require('../../database');

const userRoute = require('./user');
const notesRoute = require('./notes');

router.use(`/user`, userRoute);
router.use(`/notes`, notesRoute);

module.exports = router;
