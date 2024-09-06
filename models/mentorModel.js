const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var plm = require("passport-local-mongoose");

// Define the Mentor Schema
const mentorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
     bio: {
        type: String,
     },
     contact: {
        type: Number,
        required: true,
     },
    skills: [{
        type: String,
        required: true
    }],
    StartedWorking:{
        type: Date,
        // required: true
    },
    linkedIn:{
        type: String,
        // required: true
    },
    availableSlots: [{
        startTime: {
            type: Date,
            // required: true
        },
        endTime: {
            type: Date,
            // required: true
        },
        isBooked: {
            type: Boolean,
            // default: false
        }
    }],
    bookings: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        skillRequested: String,
        slot: {
            startTime: Date,
            endTime: Date
        },
        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Rejected'],
            default: 'Pending'
        },
        notificationSent: {
            type: Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update the timestamp
mentorSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

mentorSchema.plugin(plm);

// Export the Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;