import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is required !"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    profile_picture: {
        type: String,
    },
    bio: {
        type: String,
        default: ""

    },
},{
    timestamps: true,

});

const User = mongoose.model('User', userSchema);

export default User;

