import { Request, Response, NextFunction } from "express";
import joi from "joi";
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

const postSchema = joi.object({
	title: joi.string().required(),
	subtitle: joi.string().required(),
	image:joi.string().required()
});

const commentSchema = joi.object({
	comment: joi.string().required(),
});

export function signupMiddleware(req: Request, res: Response, next: NextFunction) {
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

export function signinMiddleware(req: Request, res: Response, next: NextFunction) {
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

export function commentMiddleware(req: Request, res: Response, next: NextFunction) {
	const comment = req.body;
	const commentValidation = commentSchema.validate(comment,{ abortEarly: false });
	const errorMessages = [];

	if (commentValidation.error) {
		commentValidation.error.details.map((error)=>{errorMessages.push(error.message.replace('\"', "").replace('\"', ""))})
		res.status(422).send(errorMessages);
		return;
	}

	res.locals.body = req.body;

	next();
}

export function postMiddleware(req: Request, res: Response, next: NextFunction) {
	const post = req.body;
	const postValidation = postSchema.validate(post,{ abortEarly: false });
	const errorMessages = [];

	if (postValidation.error) {
		postValidation.error.details.map((error)=>{errorMessages.push(error.message.replace('\"', "").replace('\"', ""))})
		res.status(422).send(errorMessages);
		return;
	}

	if(fileCheck(post.image) === false){
		res.status(422).send("invalid file");
		return;
	}

	res.locals.body = req.body;

	next();
}