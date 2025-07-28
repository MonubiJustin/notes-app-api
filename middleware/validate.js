module.exports = (validate) => {
  return (req, res, next) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    next();
  };
};
