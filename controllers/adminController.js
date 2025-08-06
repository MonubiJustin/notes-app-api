const User = require('../models/User');
const asyncMiddleware = require('../middleware/async');

//@desc List all users
//@route GET /api/users/
//@access admin
exports.getAllUsers = asyncMiddleware(async (req, res) => {
    const users = await User.find().select("id email username role createdAt");

    res.status(200).json({
        success: true,
        data: users
    })
})

//@desc Delete a user
//@route DELETE /api/users/:id
//@access admin
exports.deleteUser = asyncMiddleware(async (req, res) => {
    const userId = req.params.id;
    if (userId === req.user.id) return res.status(400).json({
        success: false,
        message: "Cannot delete yourself"
    });

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({
        success: false,
        message: "User not found"
    });

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})