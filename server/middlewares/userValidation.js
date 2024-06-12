import Joi from "joi"

export const userRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = schema.validate(req.body)
    if(error) {
        return res.status(400).json({message: "Bad Request", error})
    }
    return next()
}

export const userLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = schema.validate(req.body)
    if(error) {
        return res.status(400).json({message: "Bad Request", error})
    }
    return next()
}
