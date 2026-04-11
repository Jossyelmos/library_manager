const Validator = require('validatorjs');

const validateAuthor = (req, res, next) => {
  const data = req.body;

  const rules = {
    firstName: 'required|string|min:5|max:50',
    lastName: 'required|string|min:2|max:50',
    nationality: 'required|string|min:2|max:50',
    dob: 'required|string',
    dod: 'string',
    biography: 'string'
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

module.exports = validateAuthor;