const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 3,
        max: 64
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        min: 6,
        max: 256,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    notes: [{

        title: {
            type: String,
            required: true,
            max: 128
        },
        desc: {
            type: String,
            max: 256
        },
        
        // CONSIDER: Array of tags perhaps?
        // if Create ENUM and validate

        tag: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    }]

});

module.exports = mongoose.model('User', userSchema, 'user');