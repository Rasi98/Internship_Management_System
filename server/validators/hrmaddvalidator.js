import expressValidator from "express-validator";
const { check, validationResult } = expressValidator;

export const hrmValidatorResult = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const result = error.array()[0].msg;
    return res.status(200).json({ result: result });
  }
  next();
};

export const hrmValidator = [
  check("name").not().isEmpty().withMessage("Name is required!"),
  check("designation").not().isEmpty().withMessage("Designation is required!"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Provide a valid email!")
    .normalizeEmail(),
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phoneno is required!")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone no. Should be 10 digits!"),
  check("company").not().isEmpty().withMessage("Company is required!"),
];
