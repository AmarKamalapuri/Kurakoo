const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        hash_password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        year: {
            type: Number,
            integer: true,
            max : 5
        },
        collegeName: {
            type: String,
            trim: true,
            min: 5,
            max: 20
        },
        contactNumber: {
            type: Number,
            integer: true,
            max : 12
        },
        upvotedAns: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        downvotedAns: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        upvotedQs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        downvotedQs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],

        //profilePicture: { type: String} will be added later in future
    },
    { timeStamps: true }
);

userSchema.virtual("password").set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
};

module.exports = mongoose.model("User", userSchema);
