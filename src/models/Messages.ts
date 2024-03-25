import mongoose, { Mongoose } from "mongoose";


const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatAppSignUp'
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatAppSignUp'
    },

    text: String,
    UniqueMessageId: {
        type: String
    }
}, { timestamps: true });

const MessageModel = mongoose.models.ChatMessage || mongoose.model("ChatMessage", MessageSchema);

export default MessageModel;