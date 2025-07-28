const mongoose = require("mongoose");

module.exports = () => {
  const db = process.env.MONGO_URI;

  mongoose
    .connect(db)
    .then(() => console.log(`Connected to DB: ${db}`))
    .catch((err) => console.log(err));
};
