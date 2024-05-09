import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Hash the password with bcrypt before saving
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_KEY,
            { expiresIn: "7d" })
    } catch (error) {
        console.log("Error in jwt token user-model", error)
    }
}

export const UserModel = model('User', userSchema);
