import mongoose from 'mongoose';

const SignInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: '',
    },

    About: {
        type: String,
        default: '',
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    friends: {
        type: Array,
        default: [],
    },
}, { timestamps: true })

const ChatApp = mongoose.models.ChatAppSignUp || mongoose.model('ChatAppSignUp', SignInSchema);
export default ChatApp;