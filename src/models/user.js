import mongoose from '../database/connection.js';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    active: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Buffer
    },
    document: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        zipcode: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        complement: {
            type: String
        },
        quarter: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    teste: {
        type: Buffer
    }
});

UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
    }

    next();
});

const User = mongoose.model('User', UserSchema);

export default User;