import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: [true, "Username already exist!"],
        required: [true, "Username is required!"],
        minLength: [3, "Min Length is 3 for username."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email is already taken."],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is invalid"]
    },
    firstName: {
        type: String,
        required: [true, "First Name is required!"],
        minLength: [2, "Min Length is 2 for firstname."]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"],
        minLength: [2, "Min Length is 2 for lastname."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            "Password must have uppercase, lowercase, number, and special character"
        ]
    },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    accountNumber: { type: Number, unique: true },
});

userSchema.pre("save", function (next) {
    if (!this.accountNumber) {
        this.accountNumber = Math.floor(10000000 + Math.random() * 90000000);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;