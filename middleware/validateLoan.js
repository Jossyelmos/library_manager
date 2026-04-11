const Validator = require('validatorjs');

const validateLoan = (req, res, next) => {
  const data = req.body;

  const rules = {
    memberId: 'required|string',
    bookId: 'required|string',
    dueDate: 'required|string'
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

module.exports = validateLoan;