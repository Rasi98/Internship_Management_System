import expressValidator from "express-validator";
const { check, validationResult } = expressValidator;

export const studentProfileValidatorResult = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const result = error.array()[0].msg;
    return res.status(200).json({ result: result });
  }
  next();
};

export const studentProfileValidator = [
  check("firstname").not().isEmpty().withMessage("Firstname is required!"),
  check("lastname").not().isEmpty().withMessage("Lastname is required!"),
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
  check("college").not().isEmpty().withMessage("University is required!"),
  check("qualification1").not().isEmpty().withMessage("Degree is required!"),
  check("fromyear1")
    .not()
    .isEmpty()
    .withMessage("University enrolled year is required!"),
  check("toyear1")
    .not()
    .isEmpty()
    .withMessage("University end year is required!"),
  check("school").not().isEmpty().withMessage("School is required !"),
  check("fromyear2")
    .not()
    .isEmpty()
    .withMessage("School enrolled year is required!"),
  check("toyear2").not().isEmpty().withMessage("School end year is required !"),
];
