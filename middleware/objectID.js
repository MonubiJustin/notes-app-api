const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        success: false,
        message: "Invalid Object ID"
    })

    next()
}