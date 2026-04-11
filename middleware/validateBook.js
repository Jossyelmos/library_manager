const Validator = require('validatorjs');

const validateBook = (req, res, next) => {
  const data = req.body;

  const rules = {
    title: "required|string",
    authorId: "required|string",
    isbn: "required|string",
    copiesOwned: "required|integer|min:0",
    copiesAvailable: "required|integer|min:0"
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validation.errors.all()
    });
  }

  next(); // move to controller if validation passes
};

module.exports = validateBook;