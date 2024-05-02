import { mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
         type: mongoose.Schema.Types.String,
         required: true,
         unique: true,
         minlength: 5,
         maxlength: 32,
    },
    displayName:{
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 5,
        maxlength: 32,
    },
    password: mongoose.Schema.Types.String,
})

export const User = mongoose.model('User', UserSchema);
