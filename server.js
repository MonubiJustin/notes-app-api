require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const users = require("./routes/users");
const notes = require("./routes/notes");
const admin = require("./routes/admin")
const error = require("./middleware/error");
const notFound = require("./middleware/notFound");

const app = express();

require("./config/database")(); // connection to the database

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/users", users);
app.use("/api/notes", notes);
app.use("/api/users", admin)
app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
