const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: {
      type: String,
      maxLength: 50,
      validate: {
        validator: async function (value) {
          if (!value) return true; // Allow empty usernames
          const existingUser = await this.constructor.findOne({ username: value });
          return !existingUser || existingUser._id.equals(this._id); // Ensure uniqueness for non-empty usernames
        },
        message: "Username must be unique.",
      },
    },
  },
  { timestamps: true }
);

// hashing the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// checking if the password is valid
userSchema.methods.isPasswordValid = async function (body_password) {
    return await bcrypt.compare(body_password, this.password);
};

// generating the Authentication token
userSchema.methods.genAuthToken = function () {
    return jwt.sign({ id: this._id.toString(), email: this.email }, process.env.SECRET_KEY);
};

module.exports = mongoose.model('User', userSchema);