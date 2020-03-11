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

        tag: {
            type: String,
            required: true,
        },

        // Path to a note
        path: {
            type: String,
            required: true
        },

        check: {
            type: Boolean,
            default: false
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        remindDate: {
            type: Date,
            required: true
        }

    }]

});

module.exports = mongoose.model('User', userSchema, 'user');