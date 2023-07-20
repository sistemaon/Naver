
const connection = require('../../../configs/db.config');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: 'string',
    email: 'string',
    password: {
        salt: { type: String, required: true },
        hash: { type: String, required: true }
    },
    navers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Naver"
        }
    ]
});

userSchema.methods.generateHashpass = function (passInput) {
    this.password['salt'] = crypto.randomBytes(64).toString('hex')
    this.password['hash'] = crypto.pbkdf2Sync(passInput, this.password['salt'], 100000, 512, 'sha512').toString('hex')
};

userSchema.methods.validHashpass = function (passInput) {
    const hash = crypto.pbkdf2Sync(passInput, this.password['salt'], 100000, 512, 'sha512').toString('hex')
    return this.password['hash'] === hash
};

const user = connection.model('User', userSchema);

module.exports = user;
