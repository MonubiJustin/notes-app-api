const Note = require('../models/Note');
const asyncMiddleware = require('../middleware/async');
const _ = require('lodash')

//@desc Creates a new note for the authenticated user
//@route POST /api/notes
//@access private
exports.createNote = asyncMiddleware(async (req, res) => {
    const { title, content, isShared} = req.body;
    const note = new Note({
        title, content, isShared, userId: req.user.id
    })
    await note.save();
    res.status(201).json({
        success: true,
        message: "Note created Successfully",
        data: _.pick(note, ['id', 'title', 'content', 'userId', 'isShared', 'createdAt'])
    });
});

//@desc Lists all notes belonging to the authenticated user
//@route GET /api/notes
//@access private
exports.getNotes = asyncMiddleware(async (req, res) => {
    const isShared = req.query.isShared;
    const query = { userId: req.user.id };

    if (isShared === 'true') {
        query.isShared = true
    } else if (isShared === 'false') {
        query.isShared = false
    }

    const notes = await Note.find(query).select("-userId -__v");
    console.log(notes);
    res.status(200).json({
        success: true,
        data: notes
    });
})

//@desc Retrieve a specific note by ID
//@route GET /api/notes/:id
//@access private
exports.getSingleNote = asyncMiddleware(async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, userId: userId});

    if (!note) return res.status(404).json({
        success: false,
        message: "Note not found or access denied"
    });

    res.status(200).json({
        success: true,
        data: _.pick(note, ['id', 'title', 'content', 'isShared', 'createdAt', 'updatedAt'])
    })
})

//@desc Update a note's title, content, or shared status
//@route PUT /api/notes/:id
//@access private
exports.updateNote = asyncMiddleware(async (req, res) => {
    console.log('update route hit')
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOneAndUpdate({ _id: noteId, userId }, { $set: req.body }, { new: true });

    if (!note) return res.status(404).json({
        success: false,
        message: "Note not found or access denied"
    });

    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: note
    });
});

//@desc Deletes a note by ID
//@route DELETE /api/notes/:id
//@access private
exports.deleteNote = asyncMiddleware(async (req, res) => {
    const noteId = req.params.id
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) return res.status(404).json({
        success: false,
        message: "Note not found or access denied"
    });

    res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    })
})

//@desc Shares notes to the public
//@route GET /api/notes/shared/:id
//@access public
exports.sharedNotes = asyncMiddleware(async (req, res) => {
    const noteId = req.params.id;

    const notes = await Note.find({ _id: noteId, isShared: true }).select("-userId -__v");
    res.status(200).json({
        success: true,
        data: notes
    })
})