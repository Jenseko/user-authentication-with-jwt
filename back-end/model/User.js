import { Schema, model } from 'mongoose';
import crypto from 'crypto';

// --------------------------------------------

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        salt: { type: String, required: true },
        hash: { type: String, required: true }
    }
);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(64).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, ths.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};




export const User = model('User', userSchema);