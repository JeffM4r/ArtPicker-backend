import joi from "joi";
import { fileCheck } from "./fileValidation.js";

const signupSchema = joi.object({
	userName: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	image:joi.string().required()
});

export function signupMiddleware(req, res, next) {
	const user = req.body;
	const userValidation = signupSchema.validate(user,{ abortEarly: false });
	const errorMessages = []

	if (userValidation.error) {
		console.log(userValidation.error.details)
		userValidation.error.details.map((error)=>{errorMessages.push(error.message.replace('\"', "").replace('\"', ""))})
		res.status(422).send(errorMessages);
		return;
	}

	res.locals.user = req.body;

	next();
}