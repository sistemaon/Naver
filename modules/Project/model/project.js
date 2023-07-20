
const connection = require('../../../configs/db.config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: 'string',
    naver: {
        type: Schema.Types.ObjectId,
        ref: "Naver"
    }
});

const project = connection.model('Project', projectSchema);

module.exports = project;
