const express = require('express')
const auth = require('../middleware/auth');
const admin = require("../middleware/admin")
const adminController = require("../controllers/adminController")
const {deleteNoteAdmin} = require("../controllers/noteController")
const objectID = require("../middleware/objectID")


const router = express();
router.use(auth, admin)

// get all users
router.get('/', adminController.getAllUsers)


// delete a user
router.delete('/:id', objectID, adminController.deleteUser)

// Delete any note
router.delete("/:id/admin", objectID, deleteNoteAdmin)


module.exports = router;