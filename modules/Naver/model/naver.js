
const connection = require('../../../configs/db.config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const naverSchema = new Schema({
    name: 'string',
    birthdate: 'date',
    admissionDate: 'date',
    jobRole: 'string',
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

const naver = connection.model('Naver', naverSchema);

module.exports = naver;
