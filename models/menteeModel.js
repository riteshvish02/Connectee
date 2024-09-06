const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var plm = require("passport-local-mongoose");

// Define the Mentee Schema
const menteeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skillsInterestedIn: [{
        type: String,
        required: true
    }],
    bookings: [{
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        skillRequested: String,
        slot: {
            startTime: Date,
            endTime: Date
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending'
        },
        mentorFeedback: String,
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
menteeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

menteeSchema.plugin(plm);
// Export the Mentee model
const Mentee = mongoose.model('Mentee', menteeSchema);

module.exports = Mentee;
