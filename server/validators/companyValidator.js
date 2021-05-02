import expressValidator from 'express-validator';
const {check,validationResult}=expressValidator;

export const companyValidationResults=(req,res,next)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        const result=error.array()[0].msg;
        return res.status(200).json({result:result})
    }
    next();
};

export const companyValidator=[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Company name is required !'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required !')
        .isEmail()
        .withMessage('Provide a valid email')
        .normalizeEmail(),
    check('phone')
        .isLength({ min: 10 , max:10 })
        .withMessage('Phone no. Should be 10 digits !')
];

