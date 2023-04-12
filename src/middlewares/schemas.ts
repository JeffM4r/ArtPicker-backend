import joi from "joi";
import fs from 'fs';
import { fileCheck } from "./fileValidation.js";

const signupSchema = joi.object({
	userName: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	image:joi.string().required()
});

const signinSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

export function signupMiddleware(req, res, next) {
	const user = req.body;
	const userValidation = signupSchema.validate(user,{ abortEarly: false });
	const errorMessages = [];

	if (userValidation.error) {
		userValidation.error.details.map((error)=>{errorMessages.push(error.message.replace('\"', "").replace('\"', ""))})
		res.status(422).send(errorMessages);
		return;
	}

	if(fileCheck(user.image) === false){
		res.status(422).send("invalid file");
		return;
	}

	res.locals.user = req.body;

	next();
}

export function signinMiddleware(req, res, next) {
	const user = req.body;
	const userValidation = signinSchema.validate(user,{ abortEarly: false });
	const errorMessages = [];

	if (userValidation.error) {
		userValidation.error.details.map((error)=>{errorMessages.push(error.message.replace('\"', "").replace('\"', ""))})
		res.status(422).send(errorMessages);
		return;
	}

	res.locals.user = req.body;

	next();
}