const express = require("express");
const noteController = require("../controllers/noteController");
const validateMiddleware = require("../middleware/validate");
const { createNote, updateNote } = require("../validators/noteValidator");
const auth = require("../middleware/auth");
const objectID = require("../middleware/objectID");
const { notesLimiter } = require("../middleware/rateLimiter");

const router = express.Router();
// shared notes
router.get('/shared/:id', objectID, noteController.sharedNotes);
router.use(auth, notesLimiter);

// create note
router.post("/", validateMiddleware(createNote), noteController.createNote);

// get all notes
router.get("/", noteController.getNotes);

// get Single note
router.get("/:id", objectID, noteController.getSingleNote);

// update notes
router.put(
  "/:id",
  [objectID, validateMiddleware(updateNote)],
  noteController.updateNote
);

// delete note
router.delete("/:id", objectID, noteController.deleteNote);

module.exports = router;
